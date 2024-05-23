import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Img, Text, Button, Heading } from "../../components";
import Header from "../../components/Header";
import "./index.css";
import  { resultUrl, fetchQuestionsUrl, reponsesUrl, personalityUrl, maxIterationUrl } from "../url.jsx";


const CircleRadioButton = ({ questionId, id, color, onSelect, selected }) => {
  const handleClick = () => {
    onSelect(questionId, id);
  };

  return (
    <div
      className={`circle-radio-button ${selected ? 'selected' : ''}`}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    ></div>
  );
};

export default function Test() {
  const location = useLocation();
  const [selectedIds, setSelectedIds] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [personalityData, setPersonalityData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [showPersonalityData, setShowPersonalityData] = useState(false); // State to manage visibility
  const [showQuestions, setShowQuestions] = useState(true);

  const questionsPerPage = 7;
  const searchParams = new URLSearchParams(location.search);
  const matricule = searchParams.get("matricule");
  const prenom = searchParams.get("prenom");

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (personalityData) {
      setProgressData([
        { label: "Introversion", value: personalityData.introversionPercentage, description: "You prefer solitary activities and get exhausted by social interaction." },
        { label: "Extraversion", value: personalityData.extraversionPercentage, description: "You enjoy social gatherings and are energized by interacting with others." },
        { label: "Sensing", value: personalityData.sensingPercentage, description: "You are detail-oriented and prefer concrete information over abstract theories." },
        { label: "Intuition", value: personalityData.intuitionPercentage, description: "You are imaginative and rely on patterns and possibilities rather than facts." },
        { label: "Thinking", value: personalityData.thinkingPercentage, description: "You make decisions based on logic and objective criteria." },
        { label: "Feeling", value: personalityData.feelingPercentage, description: "You prioritize values and people when making decisions." },
        { label: "Judging", value: personalityData.judgingPercentage, description: "You prefer structure and clear plans over spontaneity." },
        { label: "Perceiving", value: personalityData.perceivingPercentage, description: "You prefer flexibility and adaptability over planning." }
      ]);
    }
  }, [personalityData]);

  const fetchQuestions = () => {
    fetch(fetchQuestionsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idTest: 1 }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const initialSelectedIds = {};
      data.forEach(question => {
        initialSelectedIds[question.idQuestion] = null;
      });
      setSelectedIds(initialSelectedIds);

      setQuestions(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSelect = (questionId, id) => {
    setSelectedIds(prevState => ({
      ...prevState,
      [questionId]: id
    }));
  };

  const handletest = () => {
    fetch(personalityUrl + matricule + "/1")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPersonalityData(data);
        setShowPersonalityData(true); // Show the personality data section
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

let max;

const handlesubmit = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const responses1 = {
      matricule: parseInt(matricule)
  };
  // Posting responses
  return fetch(maxIterationUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(responses1),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Convert response to JSON
      })
      .then(data => {
          // Store the max value in the variable max
          max = data;
          console.log(max);

          // Create responses array for the first fetch request
          const responses = Object.entries(selectedIds).map(([questionId, selectedId]) => ({
              reponse: selectedId ? getResponseValue(selectedId) : null,
              matricule: parseInt(matricule),
              idQuestion: parseInt(questionId),
              iteration: max,
              increment: 1
          }));

          // posting responses
          const fetchPromises = responses.map(response => {
              return fetch(reponsesUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(response),
              })
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                  });
          });

          return Promise.all(fetchPromises);
      })
      .then(() => {
          // posting result
          const resultData = {
              date: currentDate,
              fkUtilisateurId: matricule,
              fkTestId: 1
          };

          return fetch(resultUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(resultData),
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
};

const handlesubmitandtest = () => {
  // Check if any question is unanswered
  const unansweredQuestions = Object.values(selectedIds).some(id => id === null);
  if (unansweredQuestions) {
    // If there are unanswered questions, show an error message and return
    alert("Please answer all questions before submitting.");
    return;
  }

  // All questions have been answered, proceed with submitting and testing
  handlesubmit()
    .then(() => {
      handletest();
      setShowQuestions(false); // Hide questions and buttons section
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

  const getResponseValue = (selectedId) => {
    switch (selectedId) {
      case 1:
        return 0;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 100;
      default:
        return null;
    }
  };
  const [hoveredLabel, setHoveredLabel] = useState(null);

  const handleMouseEnter = (label) => {
    setHoveredLabel(label);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <> 
      <div className="flex w-full flex-col gap-[29px] bg-gray-50 py-8 sm:py-5">
        <Header className="ml-[58px] flex w-[61%] items-start justify-between gap-5 md:ml-0 md:w-full md:flex-col md:p-5" />
        <div>
          <div className=" mt-[-16px] flex flex-col items-center">
            <div className="relative h-[704px] self-stretch md:h-auto">
              <div className="w-full">
                <div className="relative z-[1] flex bg-teal-400  sm:p-5">
                  <Heading
                    size="md"
                    as="h1"
                    className=" relative z-[1] ml-[81px] mt-[249px] w-[42%] leading-[72px] tracking-[-0.50px] !text-white-A700 md:ml-0"
                  >
                    {prenom.toUpperCase()}, <br />
                    PRET POUR PASSER LE TEST?
                  </Heading>
                </div>
                <div className="relative mt-[-1px] h-[120px] bg-deep_orange-100_dd" />
              </div>
              <Img
                src="images/img_image_3.png"
                alt="imagethree"
                className="absolute bottom-0 right-[14%] top-0 z-[2] my-14 h-[70%]"
              />
            </div>

            {showQuestions && (
                <div className="mt-[5px] flex w-[80%] flex-col gap-[61px]  md:mt-10  lg:w-full md:p-5">
                  {currentQuestions.map((question, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-[59px] sm:gap-[29px]">
                      <Text className="text-mid ml-9 tracking-[-0.50px]">
                        {question.questionFrancais}
                      </Text>
                      <div className="flex mx-auto items-start justify-between self-stretch w-[80%]">
                        <Text className="text-mid mt-[30px] tracking-[-0.50px] !text-gray-600_01">
                          Pas D’accord
                        </Text>
                        <div className="mx-auto flex w-[45%] items-center justify-between md:w-full">
                          <CircleRadioButton questionId={question.idQuestion} id={1} onSelect={handleSelect} selected={selectedIds[question.idQuestion] === 1} />
                          <CircleRadioButton questionId={question.idQuestion} id={2} onSelect={handleSelect} selected={selectedIds[question.idQuestion] === 2} />
                          <CircleRadioButton questionId={question.idQuestion} id={3} onSelect={handleSelect} selected={selectedIds[question.idQuestion] === 3} />
                          <CircleRadioButton questionId={question.idQuestion} id={4} onSelect={handleSelect} selected={selectedIds[question.idQuestion] === 4} />
                        </div>
                        <Text className="text-mid mt-[30px] tracking-[-0.50px] !text-blue_gray-500">
                          D’accord
                        </Text>
                      </div>
                    </div>
                  ))}
                  {currentPage === Math.ceil(questions.length / questionsPerPage) && (
                    <Button
                      shape="round" 
                      className="h-12 w-40 text-mid-3 mr-[94px] mt-[11px] self-end !rounded-[29px] font-medium tracking-[0.50px] md:mr-0 sm:px-5"
                      onClick={() => {
                        handlesubmitandtest(); // Call the handlesubmitandtest function
                        window.scrollTo({ top: 700, behavior: 'smooth' });
                      }}  >
                      Submit
                    </Button>
                  )}
                  {currentPage < Math.ceil(questions.length / questionsPerPage) && (
                    <Button
                    shape="round" 
                    className="h-12 w-40 text-mid-3 mr-[94px] mt-[11px] self-end !rounded-[29px] font-medium tracking-[0.50px] md:mr-0 sm:px-5"
                    onClick={() => {
                      const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
                      const unansweredQuestions = currentQuestions.some(question => selectedIds[question.idQuestion] === null);
                    
                      if (unansweredQuestions) {
                        // If there are unanswered questions, show an alert or dialog
                        alert("Please answer all questions before moving to the next page.");
                      } else {
                        // If all questions are answered, move to the next page
                        setCurrentPage(prevPage => prevPage + 1);
                  
                        // Scroll to the top of the questions page
                        window.scrollTo({ top: 580, behavior: 'smooth' });
                      }
                    }}
                  >
                    Next
                  </Button>
                  
                  
                  )}
                </div>
              )}



            {showPersonalityData && (
              <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                  <div className="m-auto flex flex-col items-end gap-3.5 ">
                    <Text size="xl" as="p" className="m-auto">
                      Your personality type is:
                    </Text>
                    <Heading as="h1" className="m-auto " style={{ color: '#74ABFF' }}>
                      {personalityData.personnalite}
                    </Heading>
                  </div>
                  <Text size="md" as="p" className="mt-8 w-[50%] m-auto text-center">
                    {personalityData.description}
                  </Text>
                  <div className="flex justify-center w-full items-center">
                    <div className="bg-blue_gray-100_23 m-auto w-[90%] pb-32 pt-[30px] ">
                      <div className="flex m-auto w-full flex-col ">
                      <div className="small flex items-center ml-9 gap-[55px]  w-full sm:gap-[28px]">
                          <div className="card w-[25%]">
                            <Img
                              src={personalityData.img}
                              alt="image"
                              className="m-auto h-auto"
                            />
                          </div>
                          <div className="w-full mx-auto mt-16 md:mt-6 sm:mt-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridRowGap: '15px', gridColumnGap: '20px', width: '450px' }}>
                            {progressData.map((item, index) => (
                              <div
                                key={index}
                                className="progress-container"
                                onMouseEnter={() => handleMouseEnter(item)}
                                onMouseLeave={handleMouseLeave}
                                style={{ width: '200', height: '30px' }} 
                              >
                                <div className="label">{item.label}</div>
                                <progress
                                  max={100}
                                  value={item.value}
                                  className="custom-progress w-full h-[25px]"
                                  style={{ height: '100' }} 
                                />
                                <div className="value-label">{item.value}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col sm:mx-auto" style={{ width: '30%' }}>
                            <div className="mt-5 flex flex-col gap-2 md:m-auto sm:m-auto" style={{ width: '100%' }}>
                              {hoveredLabel ? (
                                <div className="mt-5 gap-2 md:m-auto sm:m-auto w-[80%]" style={{ wordWrap: 'break-word' }}>
                                  <Text className="!text-gray-700">{hoveredLabel.label}</Text>
                                  <Text>{hoveredLabel.description}</Text>
                                </div>
                              ) : (
                                <div>
                                  <Text className="!text-gray-700">You’re best fit as:</Text>
                                  {personalityData.jobs.split(',').map((job, index) => (
                                    <Heading key={index} as={`h${index + 3}`}>{job.trim()}</Heading>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-[154px] flex w-[40%] flex-col items-center gap-[54px] md:w-full md:p-5 sm:gap-[27px]">
              <div className="flex flex-wrap justify-between gap-9 ">
                <a href="#">
                  <Text size="s" as="p" className="text-sm tracking-[0.50px] !text-black-900">
                    Contact{" "}
                  </Text>
                </a>
                <a href="#">
                  <Text size="s" as="p" className="text-sm tracking-[0.50px] !text-black-900">
                    Terms & Conditions
                  </Text>
                </a>
                <a href="#">
                  <Text size="s" as="p" className=" text-sm tracking-[0.50px] !text-black-900">
                    About us
                  </Text>
                </a>
              </div>
              <div className="flex w-[27%] items-center justify-center gap-8 md:w-full">
                <Img src="images/img_ic_baseline_facebook.svg" alt="icbaseline" className="h-[30px] w-[30px]" />
                <Img src="images/img_mdi_instagram.svg" alt="mdiinstagram" className="h-[30px] w-[30px]" />
                <Img src="images/img_pajamas_twitter.svg" alt="pajamastwitter" className="h-[25px] w-[25px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
