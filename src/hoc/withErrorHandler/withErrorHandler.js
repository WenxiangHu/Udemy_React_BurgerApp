import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../auxComponent';
import useHttpErrorHandler from '../../hooks/http-error-handler';

// const withErrorHandler = (WrappedComponent, axios) => {
//     return props => {
//         // constructor(props) {
//         //     super(props);
//         //     axios.interceptors.request.use(req => {
//         //         this.setState({ error: null })
//         //         return req
//         //     })
//         //     axios.interceptors.response.use(res => res, error => {
//         //         this.setState({ error: error })
//         //     })
//         // }

//         // state = {
//         //     error: null
//         // }
//         const [error, setError] = useState(null)

//         // UNSAFE_componentWillMount() {
//         // componentDidMount() {
//         //since it used componentWillMount, just render it before return. 
//         const reqInterceptor = axios.interceptors.request.use(req => {
//             // this.setState({ error: null })
//             setError(null)
//             return req
//         })
//         const resInterceptor = axios.interceptors.response.use(res => res, err => {
//             // this.setState({ error: error })
//             setError(err)
//         })
//         // }

//         // componentWillUnmount() {
//         // console.log('Will Unmount')
//         useEffect(() => {
//             return () => {
//                 axios.interceptors.request.eject(reqInterceptor);
//                 axios.interceptors.response.eject(resInterceptor)
//             }
//         }, [reqInterceptor, resInterceptor])
//         // }

//         const errorConfirmedHandler = () => {
//             // this.setState({ error: null })
//             setError(null)
//         }

//         // render() {

//         return (
//             <Aux>
//                 <Modal
//                     show={error}
//                     modalClosed={errorConfirmedHandler}>
//                     {error ? error.message : null}
//                 </Modal>
//                 <WrappedComponent {...props} />
//             </Aux>
//         )
//     }
//     // }
// }

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default withErrorHandler
