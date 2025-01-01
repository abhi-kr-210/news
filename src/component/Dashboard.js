import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../Styles/HomeStyle.css";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "./Cards";
import Table from 'react-bootstrap/Table';
import { Chart } from "react-google-charts";
import Button from 'react-bootstrap/Button';
import { usePayoutContext } from './Payoutcontext';
import { jsPDF } from "jspdf";

function Dashboard() {
  const [input, setInput] = useState(""); // Author name input
  const [type, setType] = useState(""); // Content type filter
  const [dateRange, setDateRange] = useState(""); // Date range filter
  
  const { payouts } = usePayoutContext();
  const result = payouts.reduce((acc, { name }) => {
    const existing = acc.find(item => item.name === name);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ name, count: 1 });
    }
    return acc;
  }, []);
  let grandtotal = 0; // Define grandtotal variable

function handletotal(count) {
  grandtotal = grandtotal + count * 10; // Add count*10 to grandtotal
  return count * 10; // Return the calculated value
}
// fetching of articles
const [news, setNews] = useState([]);


const api_key=process.env.REACT_APP_API_KEY;
console.log(api_key);
const getNews = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${api_key}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
 
useEffect(() => {
  getNews();
}, []);


const downloadCSV = () => {
  const header = ['Author', 'Articles', 'Payout'];
  const rows = result.map((cart) => [cart.name, cart.count, handletotal(cart.count)]);

  let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
  rows.forEach((rowArray) => {
    let row = rowArray.join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'payout_data.csv');
  document.body.appendChild(link);
  link.click();
};

const downloadPDF = () => {
  const doc = new jsPDF();
  let y = 10; // Start position for text

  // Add title
  doc.setFontSize(20);
  doc.text("Payout Data", 14, y);
  y += 10;

  // Add table headers
  doc.setFontSize(12);
  doc.text("Author", 14, y);
  doc.text("Articles", 50, y);
  doc.text("Payout", 100, y);
  y += 10;

  // Add table rows
  result.forEach((cart) => {
    doc.text(cart.name, 14, y);
    doc.text(cart.count.toString(), 50, y);
    doc.text(handletotal(cart.count).toString(), 100, y);
    y += 10;
  });

  // Save PDF
  doc.save("payout_data.pdf");
};
const downloadGoogleSheets = () => {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQJmW7fFdfKto-harJeUzXoAkowVgXbIV9l2g2brPq44jslX3-Nmcw5TThQ6FnQFddt7erEz5yZzIRxy/pub?output=xlsx`;

  window.open(sheetUrl, "_blank");
};


  // Data for the Chart
  const pieChartData = [["Author", "Percentage"]];

  // Process news to calculate articles per author
  const authorCounts = news.reduce((acc, article) => {
    const author = article.author || "Unknown"; // Handle missing author names
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});
  
  // Calculate the total number of articles
  const totalArticles = Object.values(authorCounts).reduce((sum, count) => sum + count, 0);
  
  // Generate pie chart data
  Object.entries(authorCounts).forEach(([author, count]) => {
    const percentage = ((count / totalArticles) * 100).toFixed(2); // Calculate percentage
    pieChartData.push([author, parseFloat(percentage)]); // Add to pie chart data
  });
  
  const options = {
    title: "News Analytics",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
      
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };
  return (
    <section className="dashboard_section">
      <Container>
        <Row>
          <Col lg={{ span: 9, offset: 1 }}>
            <div className="ads_box d-flex justify-content-between mb-5">
              <div className="box1">
                <h2
                  style={{
                    color: "#7cbdff",
                    textShadow: "1px 2.5px 3px black",
                    textTransform: "none",
                  }}
                  className="mt-0 mb-0"
                >
                  Participate in the largest online
                </h2>
                <h2
                  style={{
                    color: "white",
                    textShadow: "1px 2.5px 3px black",
                    textTransform: "none",
                  }}
                  className="mt-0"
                >
                  market by integrating your news
                </h2>
              </div>
              <div className="box2 d-flex justify-content-center align-items-center">
                <button className="learn_more">Upload Post</button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={11} md={12} sm={12}>
            <div className="main_container">
              <div className="search_box">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="search_bar1 ms-1 me-1 d-flex justify-content-center mb-3"
                >
                  <div className="input-group">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="form-control rounded-0"
                      placeholder="Search by Author"
                    />
                    <div className="input-group-append search_bar_button_box">
                      <button className="btn btn-primary rounded-0" type="submit">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                  <div className="select_box_container">
                    <div className="d-flex justify-content-center align-items-center">
                      <select
                        className="form-select select_box select_boxi"
                        aria-label="Default select example"
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <option value="">Date Range</option>
                        <option value="oldest">Oldest</option>
                        <option value="latest">Latest</option>
                      </select>
                      <select
                        className="form-select select_box"
                        aria-label="Default select example"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Type</option>
                        <option value="news">News</option>
                        <option value="articles">Articles</option>
                        <option value="blogs">Blogs</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

     <Container>
     <Row className="mt-5 news_page_row">
     {news
        .filter((article) =>
          input ? article.author?.toLowerCase().includes(input.toLowerCase()) : true
        )
        .slice(0, 12)
        .map((article, index) => (
          <Cards
            key={index}
            image={article.urlToImage || ""}
            paragraph={article.description || "No description available"}
            type="article"
            name={article.author || "Unknown"}
            title={article.title || "No Title"}
            date={article.publishedAt || "Unknown"}
            url={article.url||""}
          />
        ))}
   </Row>
   

   
      </Container>

      <Container>
      <Row>
      <Col>
      <div className="payout_calc">
      <div className='about_text mb-0'>
      <p style={{fontWeight:"800",fontSize:"2rem"}}>Payout
       <span style={{color:"#fc9f32"}}> &nbsp;Calculator</span></p>
      </div>

      <div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Author</th>
          <th>Articles</th>
          <th>Payout</th>
        </tr>
      </thead>
      <tbody>

     {result.map((cart,index)=>(
        <tr key={index}>
          <td>{cart.name}</td>
          <td>{cart.count}</td>
          <td>{handletotal(cart.count)}</td>
        </tr>
      ))}
   
      <tr>
      <td colSpan={2} style={{textAlign:"end"}}>Total Payout</td>
      <td colSpan={2} style={{textAlign:"end"}}>{grandtotal}{"₹"} </td>
      </tr>
      </tbody>
    </Table>
      
      </div>
      <div>
      <div className='about_text mb-0'>
      <div className="exportbox">
      <p style={{fontWeight:"800",fontSize:"1.2rem",marginBottom:"0",color:"rgb(22 40 55);"}}>Export Data as..</p>
      </div>
      <div className="mt-1">
      <button className="mybutton mybutton1" onClick={downloadPDF}>PDF</button>
      <button className="mybutton" onClick={downloadCSV}>CSV</button>
      <button className="mybutton" onClick={downloadGoogleSheets}>Google Sheets</button>
      </div>
      </div>
      
      </div>
      </div>

      </Col>
      <Col>
       <div className="piechart mt-2">
       <Chart
      chartType="PieChart"
      data={pieChartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
       </div>
      </Col>
      </Row>
      </Container>
    </section>
  );
}

export default Dashboard;
