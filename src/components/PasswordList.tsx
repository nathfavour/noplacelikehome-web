import { useEffect, useState } from 'react';
import axios from 'axios';

interface Password {
  id: number;
  title: string;
  username: string;
  password: string;
}

const PasswordList: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('/api/passwords');
        setPasswords(response.data);
      } catch (error) {
        console.error('Failed to fetch passwords', error);
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div>
      <h2>Password List</h2>
      <ul>
        {passwords.map((password) => (
          <li key={password.id}>
            <h3>{password.title}</h3>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
