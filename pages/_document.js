// THIS PAGE IS THE ROOT COMPONENT THAT ALLOWS CUSTOMIZATION OF THE ENTIRE HTML DOCUMENT IN THIS APP 

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlays" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
