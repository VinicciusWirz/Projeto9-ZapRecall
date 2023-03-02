import logo from "../../assets/logo.png";
import CardList from "../CardList/CardList";
import { Header, Footer } from "./styled";
import deck from "../../utils/deck";
import { useState } from "react";
import finalResult from "../../utils/finalResult";

export default function MainPage() {
    const [resultArr, setResultArr] = useState(Array(deck.length).fill('play'));
    const [progressArr, setProgressArr] = useState(Array(deck.length).fill('0'));
    const [questionProgressNumber, setQuestionProgressNumber] = useState(0);
    const [resultLine, setResultLine] = useState([]);
    const resultId = {
        0: 'nay',
        1: 'meh',
        2: 'yay'
    };

    function pickAnswer(id, cardIndex) {
        const newResultArray = [...resultArr];
        flipCard(cardIndex);
        newResultArray[cardIndex] = id;
        setResultArr(newResultArray);
        setQuestionProgressNumber(questionProgressNumber + 1);
        const newResultLine = [...resultLine];
        newResultLine.push(id);
        setResultLine(newResultLine);
    }

    function flipCard(id, progress) {
        if (progress === '3') {
            return;
        }
        const newProgress = (Number(progressArr[id]) + 1).toString();
        const newProgressArr = [...progressArr];
        const newResultArray = [...resultArr];
        newProgressArr[id] = newProgress;
        setProgressArr(newProgressArr);
        if (newResultArray[id] === 'play') {
            newResultArray[id] = 'flip';
        }
        setResultArr(newResultArray);
    }

    return (
        <>
            <Header>
                <img src={logo} alt="logo" />
                <h1>ZapRecall</h1>
            </Header>
            <CardList
                deck={deck}
                btnFunctions={pickAnswer}
                flipCard={flipCard}
                progressArr={progressArr}
                resultArr={resultArr}
                resultId={resultId}
            />
            <Footer data-test="footer">
                <p>{questionProgressNumber}/{deck.length} CONCLUÍDOS</p>
                <div>
                    {resultLine.map((r, i) => <img key={i} src={finalResult[r].imgResult} alt={r} data-test={finalResult[r].datatest} />)}
                </div>
            </Footer>
        </>
    );
}

