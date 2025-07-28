# MedGrouper: Medication Grouping Assistant

**MedGrouper** is a web-based application designed to assist nurses and healthcare professionals in safely and efficiently managing patient medication schedules. Its core feature is an intelligent algorithm that automatically groups a patient's prescribed medications, taking into account known drug interactions to prevent adverse effects. This tool aims to reduce the cognitive load on nursing staff, minimize medication errors, and improve patient safety in fast-paced clinical environments.

---

## Features

* **Patient Management**: Easily add new patients and assign them a list of prescribed medications.
* **Dynamic Medication List**: Add new medications to the system and define their potential interactions with other drugs.
* **Intelligent Medication Grouping**: For a selected patient, the application automatically calculates and displays the safest way to group medications for administration, ensuring that drugs with known interactions are not placed in the same group.
* **Interactive UI**: A clean, responsive, and intuitive user interface built with React and Bootstrap, allowing for seamless patient selection and data management.
* **Real-time Updates**: The patient's medication plan updates instantly when new patients or medications are added.
* **Client-Side Logic**: The entire application runs in the browser, using JSON files as a mock database, making it easy to run and test without a complex backend setup.

## Future Enhancements

Future development could include:

* **Backend & Database**: Replace the JSON files with a robust backend (e.g., Node.js/Express) and a proper database (e.g., PostgreSQL, MongoDB) to allow for persistent data.
* **User Authentication**: Add user accounts for nurses to manage their own list of patients.
* **API Integration**: Connect to a real-world drug interaction database API (e.g., NIH's RxNorm API) for comprehensive and up-to-date interaction data.
* **Alerts & Notifications**: Implement real-time alerts for critical interactions or upcoming medication administration times.
* **Detailed Medication Info**: Add more details for each medication, such as dosage, administration route, and side effects.
