import {UnControlled as CodeMirror} from 'react-codemirror2'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'base-64'
var base64 = require('base-64');


const CodeMirrorNoSSR = dynamic(
  () => import('./EditorComponent'),
  { ssr: false }
)

import React, { useState } from 'react'

export default function Home() {

  const [text, setText] = useState("")

  // console.log(base64.encode("]%#￡}￭￥￪jￇﾅfdﾋ￸￱ﾔﾙfJﾱW￬ￒ￳rﾏ8ﾧ￯￿￿Eﾀ"))

  React.useEffect(() => {
    
  }, []);




  return (    
    <div id="main">
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Base64/1.1.0/base64.js"></script>      
        <script src="lzma/src/lzma.js" />
        <script src="client.js" />
        <script src="codemirror/lib/codemirror.js" />

      </Head>      
      <CodeMirrorNoSSR value={"for (var i=0; i < 10; i++) {\n  console.log(i)\n}"} />
    </div>
  )
}