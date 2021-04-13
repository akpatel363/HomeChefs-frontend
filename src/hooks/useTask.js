import { useSelector } from 'react-redux';

const useTask = (task) => useSelector((s) => s.task[task]);

export default useTask;
