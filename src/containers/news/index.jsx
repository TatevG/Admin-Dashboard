import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
    GetAllNews,
    GetNews,
    AddNews,
    UpdateNews,
} from '../../action/news';
import AddNewsComp from '../../components/newsComponents/addNews';
import EditNews from '../../components/newsComponents/editNews';

const BASE_URL_IMG = process.env.BASE_URL + '/assets/'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                offset: 0,
                limit: 10,
            }
        };
        this.divOnScroll = this.divOnScroll.bind(this);
    }
    componentDidMount() {
        if(this.props.allNews.length === 0){
            this.props.GetAllNews(this.state.filter);
        }
        if(this.props.match.params.id){
            this.props.GetNews(this.props.match.params.id);
        }
    }
    componentWillUpdate(nextProps){
        if(this.props.match.params.id !== nextProps.match.params.id && nextProps.match.params.id){
            this.props.GetNews(nextProps.match.params.id);
        }
    }
    divOnScroll(e) {
        const { scrollHeight, clientHeight, scrollTop } = e.target;
        const { filter } = this.state;
        if (scrollHeight - clientHeight - scrollTop < 50) {
            if (!this.props.newsLoading && !this.props.isEnd) {
                // this.props.GetAllNews({ offset: this.state.offset + 10, limt: this.state.limt });
                // this.setState({ offset: this.state.offset + 10 })
                this.props.GetAllNews({ ...filter, offset: filter.offset + 10 });
                this.setState({ filter: { ...filter, offset: filter.offset + 10 } });
            }
        }
    }
    render() {
        const { newsLoading, allNews, isEnd, news } = this.props;
        const temp = this.props.match.params.id ? true : false;
        return (
            <div className="news">
                {
                    temp ?
                        <EditNews
                            key={news._id || "first"}
                            loading={this.props.oneNewsLoading}
                            UpdateNews={(formData) => { this.props.UpdateNews(this.props.match.params.id, formData)} }
                            //GetNews={this.props.GetNews}
                            news={news}
                            //newsId={this.props.match.params.id}
                        /> :
                        <AddNewsComp
                            AddNews={this.props.AddNews}
                        />
                }
                <div className="aside" onScroll={this.divOnScroll}>

                    {
                        allNews.map(item => {
                            return (
                                <div key={item._id} className='item'>
                                    <h3>
                                        <Link to={`/news/${item._id}`}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <div className='activImage' >
                                        <img src={item.activImagesUrl? (BASE_URL_IMG + item.activImagesUrl) : '/public/images/imageIcon.png'} alt="activ" />
                                    </div>
                                    <div className="otherImage">
                                        {
                                            item.imagesUrl.map((imageItem, index) => (
                                                <img key={item + index} src={BASE_URL_IMG + imageItem} alt="other" />
                                            ))
                                        }

                                    </div>
                                    <p>{item.body}</p>
                                </div>
                            );
                        })

                    }
                    {
                        isEnd ? <div className="end">End</div> :
                            (newsLoading && (
                                <div className="newsLoading">
                                    <img src="/public/images/newsLoading.gif" />
                                </div>
                            ))
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = store => {
    return {
        newsLoading: store.news.loading,
        oneNewsLoading: store.news.oneNewsLoading,
        allNews: store.news.data,
        isEnd: store.news.isEnd,
        news: store.news.news,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetAllNews: (filter) => dispatch(GetAllNews(filter)),
        GetNews: (id) => dispatch(GetNews(id)),
        AddNews: (formData) => dispatch(AddNews(formData)),
        UpdateNews: (id, formData) => dispatch(UpdateNews(id, formData)),

    };
};

News.propTypes = {
    GetAllNews: propTypes.func.isRequired,
    GetNews: propTypes.func.isRequired,
    AddNews: propTypes.func.isRequired,
    UpdateNews: propTypes.func.isRequired,
    allNews: propTypes.arrayOf(propTypes.any).isRequired,
    news: propTypes.objectOf(propTypes.any).isRequired,
    oneNewsLoading: propTypes.bool.isRequired,
    newsLoading: propTypes.bool.isRequired,
    isEnd: propTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));