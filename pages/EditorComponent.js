import {UnControlled as CodeMirror} from 'react-codemirror2'
import Head from 'next/head'
import React, { useState, useEffect} from 'react';

 export default function EditorComponent() {

  const [language, setLanguage] = useState("xml")


  useEffect(() => {
    if (window.location.href.includes("?") && window.location.href.includes("#")){
      var tempLang = window.location.href.split("#")[0].split("?")[1].replace("lang=", "")
      setLanguage(tempLang)

      window.document.getElementById("lang").value = tempLang      
    }    
  }, [])


  setTimeout(()=>{
    updateMode(window.document.getElementById("lang").value)
  }, 500)

  function generateLink(){
    const data = editor.getValue()

    codeToURL(data).then((res)=>{
      console.log(res)
      // window.location.href = "#" + res
      window.open("?lang=" + language + "#" + res, "_self")

      console.log(window.location.href)
    })
  }
  function updateMode(selectedValue){
    console.log(selectedValue)
    setLanguage(selectedValue)

    var langSelect = selectedValue.toLowerCase()

    var newMode = langSelect

    if (langSelect == "java"){
      newMode = "text/x-java"
    }
    editor.setOption('mode', newMode);
  }

  return (
    <div id= "editor">
      <Head>
        <script src="codemirror/lib/codemirror.js" />
        <script src="codemirror/mode/xml/xml.js" />
        <script src="codemirror/mode/css/css.js" />
        <script src="codemirror/mode/htmlmixed/htmlmixed.js" />
        <script src="codemirror/mode/clike/clike.js" />

      </Head>
      <div>
      <span>
      <h1 className="title"><span className="title2">{"{"}</span> ChaseBin <span className="title2">{"}"}</span></h1>

      <input onClick={_=>generateLink()} type="button" value="Generate Link"/>

      <select id="lang" onChange={e=>updateMode(e.target.value)} defaultValue={language} >
        <option>XML</option>
        <option>CSS</option>
        <option>HTMLMixed</option>
        <option>Java</option>
      </select>
      </span>
      </div>


      {/* <CodeMirror        
        value="<h1>I love react-codemirror2</h1>"
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true,
        }}
      /> */}
    </div>
  )
}