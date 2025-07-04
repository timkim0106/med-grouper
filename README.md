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

---

## Technology Stack

* **Frontend**:
    * [**React**](https://reactjs.org/) (v18.0+)
    * [**TypeScript**](https://www.typescriptlang.org/) for type safety and improved developer experience.
    * [**Bootstrap**](https://getbootstrap.com/) for responsive layout and UI components.
    * [**Font Awesome**](https://fontawesome.com/) for icons.
* **Data**:
    * **JSON files** are used to simulate a database for patients, medications, and drug interactions.

      
## How It Works

The core logic of the application resides in the medication grouping algorithm found in `src/services/medicationGrouper.ts`.

1.  **Data Representation**:
    * `patients.json`: Stores a list of patients and the IDs of the medications they are prescribed.
    * `medications.json`: Contains a list of all available medications with a unique ID and name.
    * `interactions.json`: A map where the key is a medication ID and the value is an array of other medication IDs it interacts with.

2.  **Grouping Algorithm**:
    * When a patient is selected, the `groupMedications` function is called with the list of that patient's medication IDs.
    * The function iterates through the patient's medications one by one.
    * For each medication, it tries to place it into an existing group. A medication can be added to a group only if it does **not** interact with **any** of the medications already in that group.
    * If no suitable existing group is found, a new group is created with the current medication as its first member.
    * This process continues until all of the patient's medications have been placed into a group.
    * The final array of groups is then displayed on the UI.



## Future Enhancements

Future development could include:

* **Backend & Database**: Replace the JSON files with a robust backend (e.g., Node.js/Express) and a proper database (e.g., PostgreSQL, MongoDB) to allow for persistent data.
* **User Authentication**: Add user accounts for nurses to manage their own list of patients.
* **API Integration**: Connect to a real-world drug interaction database API (e.g., NIH's RxNorm API) for comprehensive and up-to-date interaction data.
* **Alerts & Notifications**: Implement real-time alerts for critical interactions or upcoming medication administration times.
* **Detailed Medication Info**: Add more details for each medication, such as dosage, administration route, and side effects.
