import { XAxis as OriginalXAxis } from 'recharts';

const XAxis = ({ dataKey = 'value', ...props }) => {
  return <OriginalXAxis dataKey={dataKey} {...props} />;
};

export default XAxis;
