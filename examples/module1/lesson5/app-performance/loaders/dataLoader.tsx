import axios from 'axios';
import { Bootstrap } from '../types/Bootstrap';

export async function dataLoader(): Promise<Bootstrap> {
  const { data } = await axios.get<Bootstrap>(
    'http://localhost:3000/api/data/bootstrap?timeout=3000'
  );

  return data;
}
