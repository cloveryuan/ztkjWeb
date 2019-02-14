import React from 'react';
import { Modal } from 'antd';
import './video.scss';
import { H5splayer } from './h5splayer/h5splayer'

interface PropsConfigForm {
    videotoggle?: boolean,
    videoHide?: () => void,
    videoSrc: string,
    nom3u8: boolean
}
interface Stateconfig {
   
}

export class Videoshow extends React.Component<PropsConfigForm, Stateconfig> {

    constructor(props: PropsConfigForm) {
        super(props)
       
    }
    componentDidMount() {
        const type = this.props.videoSrc.lastIndexOf('.m3u8')
        if (type <= -1) {
            this.setState({ nom3u8: false })
        }
        console.log(this.props.nom3u8)
    }
    onCreate = () => {
        this.props.videoHide()
    }

    getIframe = () => {
        const src = './hlsplayer/index.html#' + this.props.videoSrc 
        return {
            __html: this.props.videotoggle ? (this.props.videoSrc ? `<embed
            src=${src}
            width="100%"
            height="100%"
            />` : '') : ''
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.videotoggle}
                onCancel={this.props.videoHide}
                onOk={this.onCreate}
                width="100%"
                footer={null}
                className="videowrap"
            >
                {
                    this.props.nom3u8 ? (
                        <H5splayer />
                    ) : (
                            <div dangerouslySetInnerHTML={this.getIframe()} style={{ width: '100%', height: '100%' }} />
                        )
                }

            </Modal>
        );
    }
}