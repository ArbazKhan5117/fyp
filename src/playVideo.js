import React,{Component} from 'react';
import ReactPlayer from 'react-player';
import './css/accessVideo.css';
class PlayVideo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='playVideo-class'>
            
                {this.props.type === 'video' ? 
                <ReactPlayer
                    url={[{ src: '/VideoLectures/' + this.props.videoName, type: this.props.videoType }]} // video location
                    controls  // gives the front end video controls 
                    width='540px'
                    height='350px'
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload'  //<- this is the important bit
                            }
                        }
                    }}
                    onMouseDown={this.handleMouseDown}
                    
                    onEnded={() => this.onEnded()}
                />
                :

                <ReactPlayer
                    url={[{ src: '/ContentVideo/' + this.props.videoName, type: this.props.videoType }]} // video location
                    controls  // gives the front end video controls 
                    width='540px'
                    height='350px'
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload'  //<- this is the important bit
                            }
                        }
                    }}
                    onMouseDown={this.handleMouseDown}
                    
                    onEnded={() => this.onEnded()}
                />

    }
                
                
            </div>
        );
    }
}
export default PlayVideo;