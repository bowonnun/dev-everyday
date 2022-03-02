import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

// --------------START-INDEX------------------
const BannerSkelton_wrapper = styled.div`
  height:800px;
  @media only screen and (max-width: 1024px) {
    height: 600px;
  }
  @media only screen and (max-width: 767px) {
    height: 250px;
  }
    
`;
const BoxcatSkelton_wrapper = styled.div`
  width: 110%;
  display: flex;
  padding-left:60px;
  padding-top:20px;
  @media only screen and (max-width: 767px) {
    padding-left:20px;
  }
`;
const BoxcatSkelton_item = styled.div`
  width: 500px;
  margin-right: 35px;
  @media only screen and (max-width: 767px) {

  }
`;
export const BannerSkeleton = () => (
  <BannerSkelton_wrapper>
    <Skeleton height={"100%"} />
  </BannerSkelton_wrapper>
);
export const NamesecSkeleton = () => (
  <Skeleton height={30} width={160} />
);
export const TitlesecSkeleton = () => (
  <BoxcatSkelton_wrapper>
    <Skeleton height={92} width={"560px"} />
  </BoxcatSkelton_wrapper>
);
export const SkeletonSection = () => (
  <BoxcatSkelton_wrapper>
    <BoxcatSkelton_item>
      <Skeleton height={350} width={500} />
    </BoxcatSkelton_item>
    <BoxcatSkelton_item>
      <Skeleton height={350} width={500} />
    </BoxcatSkelton_item>
    <BoxcatSkelton_item>
      <Skeleton height={350} width={500} />
    </BoxcatSkelton_item>
  </BoxcatSkelton_wrapper>
);
// --------------END-INDEX------------------

// --------------START-STORE----------------

export const StoreSkeleton = () => (
  <div className="store-sec">
    <div className="store-title" style={{ paddingRight: "4.7vw", fontSize: 'unset', marginBottom: "10px" }}>
      <Skeleton height={35} width={"300px"} />
    </div>

    <div className="store-mesonry">

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

      <div className="hashtag-item" style={{ display: "block" }} >
        <div className="store-img">
          <div style={{ background: '#fff' }}>
            <Skeleton height={300} width={"100"} />
          </div>
        </div>
        <div className="store-detail">
          <div className="store-detail_wrapper">
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"300px"} />
            </div>
            <div style={{ margin: "5px 0" }}>
              <Skeleton height={30} width={"450px"} />
            </div>
            <div style={{ margin: "15px 0" }}>
              <Skeleton height={20} width={"150px"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
            <div style={{ marginBottom: "7px" }}>
              <Skeleton height={15} width={"100"} />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

);
// --------------END-STORE------------------

// -----------------START-Store-dtail -----------
const StDetailSkeleton_wrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  width: 70%;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1300px) and (min-width: 992px){
    padding-top: 80px;
    width: 90%;
  }
  @media (max-width: 991px) and (min-width: 768px){
    padding-top: 80px;
    width: 90%;
  }
  @media (max-width: 767px){
    padding-top: 65px;
    width: 95%;
  }
`;


export const StDetailSkeleton = () => (
  <StDetailSkeleton_wrapper>
    <div style={{ height: 35, marginBottom: 15 }}>
      <Skeleton height={"100%"} width={"40%"} count={1} />
    </div>
    <div style={{ height: 35 }}>
      <Skeleton height={"100%"} width={"60%"} count={1} />
    </div>
    <div style={{ height: 490, marginTop: 35 }}>
      <Skeleton height={"100%"} width={"100%"} count={1} />
    </div>
  </StDetailSkeleton_wrapper>

);
// -----------------END-Store-detail -------------

// --------------START-ABOUTUS----------------
const AboutusSkelton_wrapper = styled.div`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Abuscol_leftSkelton = styled.div`
  width: 42%;
  padding-top: 80px;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const AbusimgSkelton = styled.div`
  position: fixed;
  text-align: center;
  top: 15%;
  left: 10%;
  @media only screen and (max-width: 1440px) {
    left: 8.8%;
  }
  @media only screen and (max-width: 1024px) {
    position: relative;
    left: 0;
  }
`;
const AbusimgSkelton_item1 = styled.div`
  height:440px;
  width:385px;
  @media only screen and (max-width: 1440px) {
    height: 350px;
    width: 305px;
  }
  @media only screen and (max-width: 1040px) {
    margin: 0 auto;
  }

`;
const AbusimgSkelton_item2 = styled.div`
  margin-top: 62px;
  height:55px;
  width:100%;
  @media only screen and (max-width: 1440px) {
    margin-top: 30px;
    height:55px;
    width:100%;
  }
  @media only screen and (max-width: 1040px) {
    width:240px;
    margin: 44px auto 0 auto;
  }
  
`;
const Abuscol_rightSkelton = styled.div`
  width: 58%;
  padding-top: 370px;
  padding-bottom: 370px;
  padding-right:9%;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px !important;
    padding-bottom: 70px !important;
    padding-top: 50px !important;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px !important;
    padding-bottom: 70px !important;
    padding-top: 50px !important;
  }
`;
export const AboutusSkeleton = () => (
  <AboutusSkelton_wrapper>

    <Abuscol_leftSkelton>
      <AbusimgSkelton>
        <AbusimgSkelton_item1>
          <Skeleton circle={true} height={"100%"} width={"100%"} />
        </AbusimgSkelton_item1>
        <AbusimgSkelton_item2>
          <Skeleton height={"100%"} width={"100%"} />
        </AbusimgSkelton_item2>
      </AbusimgSkelton>
    </Abuscol_leftSkelton>

    <Abuscol_rightSkelton>
      <Skeleton height={50} width={"100%"} count={10} />
    </Abuscol_rightSkelton>

  </AboutusSkelton_wrapper>

);
// --------------END-ABOUTUS------------------
// --------------START-CONTACT-&-FAQS--------------
const ContactSkelton_wrapper = styled.div`
  position: relative;
  margin-left: 200px;
  margin-right: 132px;
  padding-bottom: 20px;
  padding-top: 80px;
  @media (max-width: 1024px) and (min-width: 992px) {
    margin-left: 50px;
    margin-right: 50px;
  }
  @media (max-width: 991px) and (min-width: 768px){
    margin-left: 50px;
    margin-right: 50px;
  }
  @media (max-width: 767px){
    margin-left: 20px;
    margin-right: 20px;
  }

`;
const CTtitleSkelton = styled.div`
padding-top: 40px;
height: 100px;
@media (max-width: 991px) and (min-width: 768px){
  padding-top: 20px;
  height: 60px;
}
@media (max-width: 767px){
  padding-top: 20px;
  height: 50px;
}
`;
const CTdesSkelton = styled.div`
padding-top: 40px;
  @media only screen and (max-width: 1440px) {

  }
`;
const CTcategorySkelton = styled.div`
padding-top: 150px;
position: relative;
height: 100%;
display: inline-block;
width: 100%;
  @media (max-width: 1024px) and (min-width: 992px) {
    padding-top: 75px;
  }
  @media (max-width: 991px) and (min-width: 768px){
    padding-top: 75px;
  }
  @media (max-width: 767px){
    padding-top: 50px;
  }
`;
const CTcategorySkelton_item = styled.div`
  float: left;
  width: 20%;
  height: 190px;
  position: relative;
  border: 1px solid #fff;
  @media (max-width: 1024px) and (min-width: 992px) {
    height: 150px;
  }
  @media (max-width: 991px) and (min-width: 768px){
    width: 33.33%;
    height: 150px;
  }
  @media (max-width: 767px){
    width: 50%;
    height: 150px;
  }
`;
export const ContactSkeleton = () => (
  <ContactSkelton_wrapper>

    <CTtitleSkelton>
      <Skeleton height={"100%"} width={"100%"} />
    </CTtitleSkelton>

    <CTdesSkelton>
      <Skeleton height={30} width={"100%"} count={3} />
    </CTdesSkelton>

    <CTcategorySkelton>

      <CTcategorySkelton_item>
        <Skeleton height={"100%"} width={"100%"} />
      </CTcategorySkelton_item>

      <CTcategorySkelton_item>
        <Skeleton height={"100%"} width={"100%"} />
      </CTcategorySkelton_item>

      <CTcategorySkelton_item>
        <Skeleton height={"100%"} width={"100%"} />
      </CTcategorySkelton_item>

      <CTcategorySkelton_item>
        <Skeleton height={"100%"} width={"100%"} />
      </CTcategorySkelton_item>

      <CTcategorySkelton_item>
        <Skeleton height={"100%"} width={"100%"} />
      </CTcategorySkelton_item>

    </CTcategorySkelton>
  </ContactSkelton_wrapper>
);
// --------------END-CONTACT------------------
export const FaqDateilSkeleton = () => (
  <section>
    <div className="f-detail-page pdtop-site">
      <div className="f-detail-page_wrapper">

        <div className="f-detail-title">
          <div className="f-title_name">
            <Skeleton height={"65px"} width={"100%"} />
          </div>

        </div>

        <div className="f-detail-block">
          <div>
            <Skeleton height={"86px"} width={"100%"} count={3} />
          </div>
        </div>

      </div>
    </div>
  </section>
);
// --------------END-CONTACT------------------

// -----------------START-TERMS-&-PRIVACY -----------
const TPSkeleton = styled.div`
  margin-left: 10%;
  margin-right: 66px;
  padding-top: 80px;
  padding-bottom: 90px;
  position: relative;
  @media (max-width: 991px) and (min-width: 768px){
    padding-top: 50px;
}
  @media (max-width: 767px){
    padding-top: 40px;
    margin-left: 15px;
    margin-right: 15px;
    padding-bottom: 45px;
    position: relative;
  }
`;
const TPtitleSkelton = styled.div`
  width: 100%;
  height: 110px;
  padding-top: 60px;
  @media (max-width: 767px){
    height: 100px;
  }
`;
const TPcontentSkelton = styled.div`
  width: 100%;
  padding-top: 40px;
  @media (max-width: 767px){
    padding-top: 30px;
  }
`;
export const TermsPrivacySkeleton = () => (
  <TPSkeleton>
    <TPtitleSkelton>
      <Skeleton height={"100%"} width={"100%"} />
    </TPtitleSkelton>
    <TPcontentSkelton>
      <Skeleton height={30} width={"100%"} count={30} />
    </TPcontentSkelton>
  </TPSkeleton>
);
// -----------------END-TERMS-&-PRIVACY -------------

// -----------------history-page -------------

export const HistorySkeleton = () => (
  <React.Fragment>
    <div style={{ width:"100vw" }}>


      <div className="timeline-group">
        <div className="year_wrapper" >

          <div className="YearSkelton" >
            <Skeleton height={"100%"} width={"100%"} />
          </div>

        </div>
        <div className="img-1_wrapper">

          <div className="Img-1Skelton" >
            <Skeleton height={"100%"} width={"100%"} className="img-1_item" />
          </div>


        </div>
        <div className="content-1_wrapper">
          <div className="content_item">
            <div>

              <div className="Content-1Skelton" >
                <Skeleton height={"100%"} width={"100%"} />
              </div>

            </div>
          </div>
        </div>
        <div className="content-2_wrapper" style={{ width: "100%" }}>
          <div style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"90%"} />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"90%"} />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"90%"} />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"90%"} />
          </div>
        </div>
        <div className="img-2_wrapper">
          <div className="Img-2Skelton" >
            <Skeleton height={"100%"} width={"100%"} className="img-1_item" />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);
// -----------------END-history-page-------------
// -----------------Hashtag-page -------------
export const HashtagSkeleton = () => (
  <section>
    <div className="hashtag-subject">
      <h1 className="hashtag-name" style={{ paddingRight: "4.7vw", paddingTop: '15px' }}>
        <Skeleton height={"60px"} width={"60%"} />
      </h1>
    </div>
    <div className="hashtag-mesonry">
      <div className="hashtag-item">
        <div className="hashtag-img">
          <div style={{ background: "#fff" }}>
            <Skeleton height={"300px"} width={"100%"} />
          </div>
        </div>
        <div className="hash-des" >
          <div className="all-tags" style={{ marginBottom: "10px" }}>
            <Skeleton height={"20px"} width={"100px"} />
          </div>
          <h2 className="hash-title" style={{ marginBottom: "10px" }}>
            <Skeleton height={"40px"} width={"100%"} />
          </h2>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
        </div>
      </div>
      <div className="hashtag-item">
        <div className="hashtag-img">
          <div style={{ background: "#fff" }}>
            <Skeleton height={"300px"} width={"100%"} />
          </div>
        </div>
        <div className="hash-des" >
          <div className="all-tags" style={{ marginBottom: "10px" }}>
            <Skeleton height={"20px"} width={"100px"} />
          </div>
          <h2 className="hash-title" style={{ marginBottom: "10px" }}>
            <Skeleton height={"40px"} width={"100%"} />
          </h2>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
        </div>
      </div>
      <div className="hashtag-item">
        <div className="hashtag-img">
          <div style={{ background: "#fff" }}>
            <Skeleton height={"300px"} width={"100%"} />
          </div>
        </div>
        <div className="hash-des" >
          <div className="all-tags" style={{ marginBottom: "10px" }}>
            <Skeleton height={"20px"} width={"100px"} />
          </div>
          <h2 className="hash-title" style={{ marginBottom: "10px" }}>
            <Skeleton height={"40px"} width={"100%"} />
          </h2>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
          <div className="hash-content" style={{ marginBottom: "5px" }}>
            <Skeleton height={"20px"} width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  </section >
);
// ----------------END-Hashtag-page -------------
const Ed_title = styled.div`
  width: 100%;
  height:80px;
  @media (max-width: 767px){
    height:50px;
  }
`;
export const EditorialSkeleton = () => (

  <div className="editorial-page pdtop-site">
    <div className="editorial_left"  >
      <Skeleton height={"100%"} width={"100%"} />
    </div>

    <div className="editorial_right">
      <div className="ed-right_wrapper">
        <div className="ed-title" style={{ display: "grid", height: "90px", padding: "10px 20px", }}>
          <Skeleton height={"60px"} width={"100%"} />
        </div>
        <div className="edbox-detail">
          <div className="box-item">
            <h5 className="box-item_title">
              <Skeleton height={"18px"} width={"150px"} />
            </h5>
            <div className="box-item_subtitle">
              <Skeleton height={"18px"} width={"100%"} />
            </div>
          </div>
          <div className="box-item">
            <h5 className="box-item_title">
              <Skeleton height={"18px"} width={"150px"} />
            </h5>
            <div className="box-item_subtitle">
              <Skeleton height={"18px"} width={"100%"} />
            </div>
          </div>
        </div>

        <div className="ed-content" style={{ fontSize: 'unset' }}>
          <div style={{ paddingTop: "45px", lineHeight: "2.5" }}>
            <Skeleton height={"24px"} width={"100%"} count={4} />
          </div>
        </div>
        <div className="edbox-tag">
          <a className="tag-item" style={{ backgroundColor: "unset", display: "block", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "0", width: "100%", transform: "translateY(-50%)" }}>
              <Skeleton height={"20px"} width={"65%"} />
            </div>
          </a>

          <a className="tag-item" style={{ backgroundColor: "unset", display: "block", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "0", width: "100%", transform: "translateY(-50%)" }}>
              <Skeleton height={"20px"} width={"65%"} />
            </div>
          </a>


        </div>
      </div>
    </div>
  </div>

);

// --------------START-STORE----------------

export const OnlineSkeleton = () => (

  <div className="product-page pdtop-site">
    <div className="product-page-wrapper">
      <div className="intro-content">
        <div className="intro-content_wrapper">
          <h2><Skeleton height={35} width={"300px"} /></h2>
          <br />
          <br />
          <div><Skeleton height={24} width={"500px"} /></div>
        </div>
      </div>
      <div className="produuct-cat">
        <div className="produuct-cat_wrapper">
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
          <div className="produuct-cat_item">
            <div className="cat-img" style={{ filter:"invert(0)" }}><Skeleton height={50} width={"50px"} /></div>
            <h5><Skeleton height={18} width={"200px"} /></h5>
          </div>
        </div>
      </div>
      <div className="link-view-all">
        <a href="#"><Skeleton height={18} width={"150px"} /></a>
      </div>
    </div>
  </div>

);
// --------------END-STORE------------------