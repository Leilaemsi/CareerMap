import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Chart from 'chart.js/auto'; // Import Chart.js library

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    fontSize:10,
    marginTop:20,
  },
  imageContainer: {
    flexShrink: 0,
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // or 'contain' depending on your preference
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50, // Adjust the width of the logo as needed
    height: 50, // Adjust the height of the logo as needed
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:'auto',
    marginRight:'auto',

  },
  text: {
    textAlign: 'left',
    marginBottom: 5,
  },
 
});

const MyDocument = ({ matricule }) => {
  const [progressData, setProgressData] = useState([]);
  const [personalityData, setPersonalityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data when component mounts
    fetch('http://192.168.100.109:3000/api/v1/utilisateur/resultats/'+matricule)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Data from API:", data);
        setPersonalityData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && personalityData.length > 0) {
      renderChart();
    }
  }, [personalityData, isLoading]);

  const renderChart = () => {
    const ctx = document.getElementById('personalityChart');

    if (!ctx) return;

    const labels = ['Introversion', 'Extraversion', 'Sensing', 'Intuition', 'Thinking', 'Feeling', 'Judging', 'Perceiving'];
    const data = personalityData.map(item => [
      item.introversionPercentage,
      item.extraversionPercentage,
      item.sensingPercentage,
      item.intuitionPercentage,
      item.thinkingPercentage,
      item.feelingPercentage,
      item.judgingPercentage,
      item.perceivingPercentage
    ]);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: data.map((values, index) => ({
          label: `Personality ${index + 1}`,
          data: values,
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1,
        })),
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <Document>
    <Page size="A4" style={styles.page}>
  <View style={styles.section}>
    {/* Logo */}
    <View style={styles.headerContainer}>
      <Image src="images/img_header_logo.png" style={styles.logo} />
      <Text style={styles.title}>Vos résultats</Text>
    </View>


    {isLoading ? (
      <Text>Loading...</Text>
    ) : (
      personalityData.map((data, index) => (
        <View key={index}>
    
            <View style={styles.logoContainer}>
    </View>
          <View key={index} style={styles.resultContainer}>
          <View style={styles.textContainer}>
            <Text>Date: {data.date}</Text>
            <Text>Personality: {data.personnalite}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Jobs: {data.jobs}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={data.img} style={styles.image} />
          </View>
        </View>
        </View>
      ))
    )}
    
    {/* Chart Container */}
    <View style={styles.chartContainer}>
      <canvas id="personalityChart" />
    </View>
  </View>
</Page>

    </Document>
  );
};

const MyPDFComponent = ({ matricule })=> {
  return (
    <div>
      {/* Provide a download link for the generated PDF */}
      <PDFDownloadLink document={<MyDocument matricule={matricule} />} fileName="personality.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default MyPDFComponent;
