# SmartAccidentDetection

It is a website that a system that can automatically detect accidents from a live video feed from a surveillance camera mounted on a roadway. The system will use a deep learning convolutional neural network model to classify each frame of video as either accident-related or non-accident-related. Once an accident is detected, the system will send an alert to the nearest emergency services and hospitals and provide the shortest route to the accident scene with less traffic congestion. This system will help to reduce the number of road accidents, save lives, and improve traffic flow.


## Setup Environment

**Create a Virtual Environment (Optional but Recommended)**

   It's a good practice to create a virtual environment to isolate dependencies for your project. Open your terminal and run:

   ```bash
   python3 -m venv myenv
   source myenv/bin/activate  # On Windows: .\myenv\Scripts\activate
   ```
**Install the dependencies**

   ```bash
   pip install -r requirements.txt
   ```

**Run the server.**

   ```bash
   python cd src && uvicorn main:app --reload
   ```
