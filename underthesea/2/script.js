class CitiesSlider extends React.Component {
  constructor(props) {
	  /*super 會參照父類別的建構子。（它會指向 React.Component 的實作。）*/
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }
/*應用程序，最小的單位是element*/
  render() {
	  
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "under the sea"),
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city),
      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split('').map(l => React.createElement("span", null, l))),

      React.createElement("p", { className: "slider__slide" }, )),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))),






      React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }),
      React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) })));


  }}

/*Constants (常數) 有點像使用 let 所宣告的變數，具有區塊可視範圍。常數不能重複指定值，也不能重複宣告。*/
const slides = [
{
  city: 'Bora　Bora',
  country: 'French　Polynesia',
  img: '2/1.jpg' },

{
  city: 'Jellyfish　Lake',
  country: 'Palau',
  img: '2/2.jpg' },

{
  city: 'Andaman　Islands',
  country: 'India',
  img: '2/3.jpg'},

{
  city: 'papua　new　guinea',
  country: 'papua　new　guinea',
  img: '2/4.jpg' },
  
{
  city: 'Danco　Island',
  country: 'Antarctica',
  img: '2/5.jpg' },
{
  city: 'hawaii',
  country: 'United　States',
  img: '2/6.jpg' },
  
{
  city: 'fiji',
  country: 'Republic　of　Fiji',
  img: '2/7.jpg' },

{
  city: 'zanzibar',
  country: 'Tanzania',
  img: '2/8.jpg' },

{
  city: 'new　caledonia',
  country: 'new　caledonia',
  img:'2/9.jpg'}];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.querySelector('#app'));