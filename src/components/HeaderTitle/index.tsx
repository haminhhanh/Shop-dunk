import React from 'react';
import Typography from '../Typography';

interface IHeaderRightTitleProps {
  title: string;
}

const HeaderTitle: React.FC<IHeaderRightTitleProps> = ({ title }) => {
  return <Typography type="Subheader - Semibold">{title}</Typography>;
};

export default HeaderTitle;
