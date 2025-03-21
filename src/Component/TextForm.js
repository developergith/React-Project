import React, { useState } from 'react';



export default function TextForm(props) {

    const handeUpclick = () => {
        console.log("Uppercase was clicked" + text);
        let newtext = text.toUpperCase();
        setText(newtext);
        props.showAlert("Converted to Uppercase", "success");
    }

    const handleLoclick = () => {
        console.log("Lowercase was clicked" + text);
        let newtext = text.toLowerCase();
        setText(newtext);
        props.showAlert("Converted to Lowercase", "success");
    }

    const handleClearclick = () => {
        console.log("Clear text was clicked" + text);
        let newtext = " ";
        setText(newtext);
        props.showAlert("Text has been cleared", "success");
    }

    const handleExtraSpaces = () => {
        console.log("Remove extra spces");
        let newtext = text.split(/[ ]+/);
        setText(newtext.join(" "));
        props.showAlert("Extra spaces has been removed", "success");
    }

    const analyzeText = () => {
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        const charCount = text.length;
        const sentiment = text.includes("good") ? "Positive" : text.includes("bad") ? "Negative" : "Neutral";

        setAnalysis({ wordCount, charCount, sentiment });
    };


    const formatText = (type) => {
        if (type === "uppercase") setText(text.toUpperCase());
        else if (type === "lowercase") setText(text.toLowerCase());
        else if (type === "capitalize") setText(text.replace(/\b\w/g, (char) => char.toUpperCase()));
        else if (type === "trim") setText(text.trim());
    };



    const handleOnChange = (event) => {
        console.log("on change");
        setText(event.target.value)
    }
    const [text, setText] = useState('Enter text here 1');


    const [analysis, setAnalysis] = useState(null);


    // setText = ("enter text on this phragraph");
    return (


        <>
            <div className='container' style={{color:props.mode === `light`?`white`:`black`}}>

                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="myBox" className="form-label">Example textarea</label>
                    <textarea className="form-control"  style={{backgroundColor:props.mode === `light`?`grey`:`white`,
                        color:props.mode === `light`?`black`:`white`   }}
                     value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
                </div>
                <button className='btn btn-primary mx-1' onClick={handeUpclick}>convert to the uppercase</button>
                <button className='btn btn-primary mx-1' onClick={handleLoclick}>convert to the LowerCase</button>
                <button className='btn btn-primary mx-1' onClick={handleClearclick}>Clear text</button>
                <button className='btn btn-primary mx-1' onClick={handleExtraSpaces}>Remove Extra spaces</button>
                <button className='btn btn-primary mx-1' onClick={analyzeText}>Analyze</button>
                <button className='btn btn-primary mx-1' onClick={formatText}>Format text</button>
            </div>

            <div className='container my-3' style={{color:props.mode === `light`?`white`:`black`}} >
                <h1>your text summary</h1>
                <p >{text.split("").length} words and {text.length} characters</p>
                <p>{0.008 * text.split("").length} Minutes read</p>

                <h1>Preview</h1>
                <p>{text}</p>
            </div>

            {analysis && (
                <div className="mt-4 p-2 border rounded">
                    <p><strong>Word Count:</strong> {analysis.wordCount}</p>
                    <p><strong>Character Count:</strong> {analysis.charCount}</p>
                    <p><strong>Sentiment:</strong> {analysis.sentiment}</p>
                </div>
            )}
        </>
    )
}
