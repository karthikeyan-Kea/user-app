import moment from 'moment';
import React from 'react';

interface Props {
  date: Date | string;
  format?: string;
}
const FormatDate: React.FC<Props> = ({ date, format = 'DD-MMM-YY [at] HH:mm' }: Props) => {
  const momentdate = moment(date);
  return <>{momentdate.format(format)}</>;
};

export default FormatDate;
