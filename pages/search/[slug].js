import React,{ Component } from 'react';
import Page from "../../layouts/main";
import Router, { withRouter } from "next/router";
import { withTranslation } from "../../i18n";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { getSearch } from "../../services/SearchService";

const Result = dynamic(() => import("../../components/result"));

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isMounted: false,
      lang: "",
      checkdata: false,
      textmassge: "Loading",
    };
  }
  componentDidMount = async () => {
    this.setState({ isMounted: true });
    const data = await getSearch(
      this.props.i18n.language,
      this.props.router.query.slug
    );
    if (data.length == 0) {
      this.setState({
        item: data,
        lang: this.props.i18n.language,
        isMounted: true,
        textmassge: this.props.t("cannotfindd-label"),
      });
    } else {
      this.setState({
        item: data,
        lang: this.props.i18n.language,
        isMounted: true,
        textmassge: "Loading....",
      });
    }
  };
  componentWillReceiveProps = async (nextProps) => {
    if (this.state.lang !== nextProps.i18n.language) {
      this.setState({ item: [] });
      const data = await getSearch(
        this.props.i18n.language,
        this.props.router.query.slug
      );
      this.setState({ item: data, lang: this.props.i18n.language });
    }
  };
  render() {
    return (
      <Page
        title={this.props.router.query.slug}
        description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"
        images="/static/images/icon-logo/LOGO_circle.png"
        keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet "
      >
        <Result
          Item={this.state.item}
          isLoading={this.state.isMounted}
          textMassge={this.state.textmassge}
          t={this.props.t}
        />
      </Page>
    );
  }
}

export async function getServerSideProps({ req }) {
  // const data = await getSearch(req.language, req.params.slug);
  return { props: { namespacesRequired: ["layout"] } };
}
Search.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation("layout")(withRouter(Search));
