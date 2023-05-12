import PropTypes from 'prop-types';

const loadingSpinnerProps = {
  fill: '#0b0c0c',
  width: '12',
  height: '5',
  rx: '2.5',
  ry: '2.5',
  opacity: '0',
  className: 'loading-spinner--spin',
};

const LoadingSpinner = ({ loading = true }) => {
  if (!loading) return null;
  return (
    <div className="loading-spinner">
      <div className="loading-spinner--inner">
        <svg
          version="1.1"
          fill="#0b0c0c"
          width="50px"
          height="50px"
          className="icon-loading"
          viewBox="-25 -25 50 50"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Loading</title>
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(0, 0, 2) translate(10 0)"
            style={{ animationDelay: '0ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(30, 0, 2) translate(10 0)"
            style={{ animationDelay: '83ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(60, 0, 2) translate(10 0)"
            style={{ animationDelay: '166ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(90, 0, 2) translate(10 0)"
            style={{ animationDelay: '249ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(120, 0, 2) translate(10 0)"
            style={{ animationDelay: '332ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(150, 0, 2) translate(10 0)"
            style={{ animationDelay: '415ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(180, 0, 2) translate(10 0)"
            style={{ animationDelay: '498ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(210, 0, 2) translate(10 0)"
            style={{ animationDelay: '581ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(240, 0, 2) translate(10 0)"
            style={{ animationDelay: '664ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(270, 0, 2) translate(10 0)"
            style={{ animationDelay: '747ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(300, 0, 2) translate(10 0)"
            style={{ animationDelay: '830ms' }}
          />
          <rect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loadingSpinnerProps}
            transform="rotate(330, 0, 2) translate(10 0)"
            style={{ animationDelay: '913ms' }}
          />
        </svg>
        <div className="loading-spinner--overlay" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
};
