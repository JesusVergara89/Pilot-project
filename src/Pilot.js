import { useEffect, useState } from 'react';

import { db } from './firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Pilot() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const tasksArray = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTasks(tasksArray);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  console.log(tasks);

  return (
    <div>
      <h1>Pilot</h1>

      <ul>{tasks.map(task => <li key={task.id}>{task.identification}</li>)}</ul>
    
    </div>
  );
}

export default Pilot;
