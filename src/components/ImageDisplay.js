//Libraries
import firebase from "./firebase";
import "firebase/database";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

//Function
function ImageDisplay() {
  const [dataPatientList, setDataPatientList] = useState([]);
  const db = firebase.database();

  /* Variables for database display */
  const [URL_Original, setURL_Original] = useState("");
  const [URL_Analisis, setURL_Analisis] = useState("");

  //Personal info
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //Cell count information
  const [noCell, setNoCell] = useState("");
  const [noCellFluorescent, setNoCellFluorescent] = useState("");
  const [noCellNonFluorescent, setNoCellNonFluorescent] = useState("");

  //Parameters Characterisitics photo
  const [filter, setFilter] = useState("");
  const [magnification, setMagnification] = useState("");
  const [flourescent, setFlourescent] = useState("");

  /* Temporary flag varible*/
  //const [selected, setSelected] = useState("");

  /*Variables to get the name of the patient*/
  const [selectedName, setSelectedName] = useState("");
  const [disableName, setDisableName] = useState(true);
  const [names, setNames] = useState([]);

  /*Variables to get the name of the patient*/
  const [selectedDate, setSelectedDate] = useState("");
  const [disableDate, setDisableDate] = useState(true);
  const [date, setDate] = useState([]);

  /*Variables to get the name of the patient*/
  const [selectedTime, setSelectedTime] = useState("");
  const [disableTime, setDisableTime] = useState(true);
  const [time, setTime] = useState([]);

  //Get patient's name
  useEffect(() => {
    db.ref(`Data`).on("value", (snapshot) => {
      const options = [];
      Object.keys(snapshot.val()).forEach((key) => {
        options.push({
          value: key,
          label: key
        });
      });
      setNames(options);
    });
  }, [db]);

  //Get the date
  const getDate = (value) => {
    db.ref(`Data/${value.value}`).on("value", (snapshot) => {
      const options = [];
      Object.keys(snapshot.val()).forEach((key) => {
        options.push({
          value: key,
          label: key
        });
      });
      setDate(options);
    });
  };
  //Get the hour
  const getTime = (value) => {
    // setDisableName(true);
    db.ref(`Data/${selectedName}/${value.value}`).on("value", (snapshot) => {
      const options = [];
      Object.keys(snapshot.val()).forEach((key) => {
        options.push({
          value: key,
          label: key
        });
      });
      setTime(options);
    });
  };

  //const direccion = "Data/Pepe Perez/18-05-2021/14:9/-Ma-fKah0rsvs1QB-_Ag";

  /*  Image display */
  const Display = (value) => {
    const direccion = `Data/${selectedName}/${selectedDate}/${value.value}`;
    //console.log("Direccion " + direccion);
    db.ref(direccion).on("value", (snapshot) => {
      const dataPatient = snapshot.val();
      const keys = Object.keys(dataPatient);
      //const dataPatientList = []; // NOO NEED
      console.log(keys);
      for (let id in dataPatient) {
        setURL_Original(dataPatient[id].LinkOriginal);
        setURL_Analisis(dataPatient[id].LinkOriginal);
        //Personal information
        setAge(dataPatient[id].Age);
        setName(dataPatient[id].CompleteName);
        setEmail(dataPatient[id].Email);

        //Cell information
        setNoCell(dataPatient[id].NumCells);
        setNoCellFluorescent(dataPatient[id].Flourecent); //CORREGIR NOMBRE
        setNoCellNonFluorescent(dataPatient[id].NonFluoCells);

        //Parameters Characterisitics photo
        setFilter(dataPatient[id].Filter);
        setMagnification(dataPatient[id].Magnification);
        setFlourescent(dataPatient[id].Flourecent); //CORRGIR NOMBRE

        console.log(dataPatient[id]);
      }
    });
  };

  /* Returning data to the App  */
  return (
    <main>
      <div className="dropdown">
        {/* Dropdown for patients Name */}
        <Dropdown
          className="dropdown"
          label="Patient's Name"
          selected={selectedName}
          disabled={!disableName}
          onChange={(value) => {
            setSelectedName(value.value);
            getDate(value);
          }}
          options={names}
        />
        {/* Dropdown for date of examination*/}
        <Dropdown
          className="dropdown"
          label="Select Day"
          selected={selectedDate}
          disabled={!disableDate}
          onChange={(value) => {
            setSelectedDate(value.value);
            getTime(value);
          }}
          options={date}
        />
        {/* Dropdown for hour of examination*/}
        <Dropdown
          className="dropdown"
          label="Select Hour"
          selected={selectedTime}
          disabled={!disableTime}
          onChange={(value) => {
            setSelectedTime(value.value);
            Display(value);
          }}
          options={time}
        />
      </div>
      <section className="row">
        <div className="column left">
          <img src={URL_Original} alt="Original" />
          <h4>Original</h4>
        </div>
        <div className="column right">
          <img src={URL_Analisis} alt="Analisis" />
          <h4>Analisis</h4>
        </div>
      </section>
      <section className="row">
        <div className="column ">
          <h4>Patient Information</h4>
          <p className="blocktext">Name : {name}</p>
          <p className="blocktext">Age : {age}</p>
          <p className="blocktext">Email : {email}</p>
        </div>
        <div className="column">
          <div>
            <h4>Characteristics</h4>
            <p className="blocktext">Filter : {filter}</p>
            <p className="blocktext">Flourescent : {flourescent}</p>
            <p className="blocktext">Magnification : {magnification}</p>
          </div>
        </div>
        <div className="column">
          <h4>Results</h4>
          <p className="blocktext">Number of Cells: {noCell} </p>
          <p className="blocktext">Flourescent Cells: {noCellFluorescent}</p>
          <p className="blocktext">
            Non-Flourescent Cells:{noCellNonFluorescent}
          </p>
        </div>
      </section>
    </main>
  );
}

export default ImageDisplay;
