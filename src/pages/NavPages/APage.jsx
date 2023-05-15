import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SERVICE_NAME } from '../../constants/AppConstants';
import { SIGN_IN_URL } from '../../constants/AppUrlConstants';
import LoadingSpinner from '../../components/LoadingSpinner';
import Message from '../../components/Message';
import sampleData from '../../constants/sampleData';
import Auth from '../../utils/Auth';
import DataDisplay from './DataDisplay';

// NOTES:
// - For the purposes of the task, data is stored in the 'sampleData.js' file rather than needing an API call

const APage = () => {
  dayjs.extend(customParseFormat);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemData, setItemData] = useState();

  document.title = SERVICE_NAME;

  const getData = async () => {
    const response = sampleData;

    const sortByLatestFirst = response.sort((a, b) => dayjs(b.creationDate) - dayjs(a.creationDate));
    setItemData(sortByLatestFirst);

    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setIsLoading(true);
    getData(signal);

    if (state?.confirmationBanner?.message) {
      setNotification({
        show: true,
        message: state?.confirmationBanner?.message,
      });
      // eslint-disable-next-line no-restricted-globals
      navigate(location.pathname, { replace: true });
    }

    // cleanup function
    return () => { controller.abort(); };
  }, [state]);

  if (isError) {
    return (
      <Message title="Something has gone wrong" redirectURL={thisUrl} />
    );
  }

  if (isLoading) { return (<LoadingSpinner />); }

  return (
    <>
      <div className="thisApp-grid-row">
        <div className="thisApp-grid-column-full">
          {notification.show && (
            <div
              className="thisApp-notification-banner thisApp-notification-banner--success"
              role="alert"
              aria-labelledby="thisApp-notification-banner-title"
              data-module="thisApp-notification-banner"
            >
              <div className="thisApp-notification-banner__header">
                <h2 className="thisApp-notification-banner__title" id="thisApp-notification-banner-title">
                  Success
                </h2>
              </div>
              <div className="thisApp-notification-banner__content">
                <h3 className="thisApp-notification-banner__heading">
                  {notification.message}
                </h3>
              </div>
            </div>
          )}
          <h1 className="thisApp-heading-xl thisApp-!-margin-bottom-4">Your items</h1>
          {itemData.length === 0 && (
            <div className="thisApp-inset-text">
              <p className="thisApp-body">You have not reported any items yet</p>
            </div>
          )}
        </div>
      </div>

      {itemData.length > 0 && (
        <DataDisplay
          data={itemData}
        />
      )}
    </>
  );
};

export default APage;
