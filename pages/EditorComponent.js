import {UnControlled as CodeMirror} from 'react-codemirror2'
import Head from 'next/head'

 export default function EditorComponent() {

  // const [editor, setEditor] = useState({})
  function generateLink(){
    const data = editor.getValue()

    codeToURL(data).then((res)=>{
      console.log(res)
      window.location.href = "#" + res
      console.log(window.location.href)
    })
  }
  function updateMode(e){
    console.log(e.target.value)

    var langSelect = e.target.value.toLowerCase()

    var mode = langSelect

    if (langSelect == "java"){
      mode = "text/x-java"
    }

    editor.setOption('mode', mode);
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
      <input onClick={_=>generateLink()} type="button" value="Generate Link"/>
      <select onChange={e=>updateMode(e)}>
        <option>XML</option>
        <option>CSS</option>
        <option>HTMLMixed</option>
        <option>Java</option>
      </select>

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