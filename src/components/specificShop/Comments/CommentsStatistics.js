import React from 'react';
import StatisticLine from "./StatisticLine";

const CommentsStatistics = ({starSelector, totals, sum}) => {
    if (Array.isArray(totals) && totals.length === 5) {
        return (
            <table className={'comment_statistic_root'}>
                <tbody>
                {totals.map((item, index) =>
                    <StatisticLine onClick={() => {
                        starSelector && starSelector(5 - index);
                    }} key={index} stars={5 - index}
                                   total={item === 0 ? 0 : parseInt(item * 100 / sum)}/>)}
                </tbody>

            </table>
        );
    } else
        return <div/>
};

export default CommentsStatistics;