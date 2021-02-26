export interface PhpData {
  status: '';
  data: string[];

  decodeJSON(json: JSON): PhpData;
}

const t: PhpData = JSON.parse('ezazeezaeza');

