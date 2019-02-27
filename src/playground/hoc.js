// Higher Order Component (HOC) = a Component (HOC) that renders another react component
// uses: renderHighjacking, manipulation of props, code reuse, abstract state.
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// HOC pattern used in redux with react
const withAdminWarning = (WrappedComponent) => {
    // this is the hoc
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info</p>}
            {/* spread with props has an effect of taking every key value pair on that object 
                and passing them down as props
            */}
            <WrappedComponent {...props}/>
        </div>
    )
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
                <p>'Please login.'</p>
            )}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="There are some details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are some details"/>, document.getElementById('app'));
