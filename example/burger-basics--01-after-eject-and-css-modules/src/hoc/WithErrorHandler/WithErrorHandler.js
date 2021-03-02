import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    // componentDidMount() { k chạy vào dây do nó chạy sau khi đã render hết !!!
    componentWillMount() {
      //  withErrorHandler được xây dựng là 1 hoc, vì vậy nếu sử dụng để wrap component khác nữa thì componentWillMount sẽ được gọi liên tục
      // vì vậy tạo ra vô số interceptors cho cùng 1 axios instance, chúng k cần thiết và gây tràn bộ nhớ
      // Khắc phục bằng cách eject interceptors sau khi nó unmount
      
      // axios.interceptors.request.use(request => {
      //   this.setState({error: null})
      //   return request
      // })
      // axios.interceptors.response.use(response => response, error => {
      //   this.setState({error: error})
      // })
      this.reqInterceptors =  axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request
      })
      this.resInterceptors = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error})
      })
    }

    componentWillUnmount () {
      // Khắc phục bằng cách eject interceptors sau khi nó unmount
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
    
    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }
    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error} 
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
    }
  }
}

export default withErrorHandler;