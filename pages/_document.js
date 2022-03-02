import Document, { Head, Main, NextScript, Html } from 'next/document'
class MyDocument extends Document {
  state = { isLoading: false }
  componentDidMount() {
    Router.events.on('routeChangeStart', () => {
    this.setState({ isLoading: true });
    });
    Router.events.on('routeChangeComplete', () => {
    this.setState({ isLoading: false });
    });
    Router.events.on('routeChangeError', () => {
    this.setState({ isLoading: false });
    });
  }
  
  render() {
    const { isLoading } = this.state;
    return (
      <Html>
        <Head>
        </Head>
        <body >
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument;