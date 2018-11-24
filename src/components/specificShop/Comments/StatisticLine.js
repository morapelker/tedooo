import React from 'react';
import ProgressBar from "../../common/ProgressBar";


const StatisticLine = ({stars, total, onClick}) => {
    return (
        <tr className={'statistic_line_root'} onClick={onClick}>
            <td className={'statistic_star_label'}>{stars} star</td>
            <td className={'statistic_pbar'}><ProgressBar progress={total} /></td>
            <td className={'statistic_total'}>{total + '%'}</td>
        </tr>
    );
};

export default StatisticLine;