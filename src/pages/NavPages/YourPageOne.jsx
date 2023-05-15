import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SERVICE_NAME } from '../../constants/AppConstants';
import { THE_ENDPOINT } from '../../constants/AppAPIConstants';
import {
  THIS_ITEM_URL,
  PAGE_ONE_URL,
} from '../../constants/AppUrlConstants';
import LoadingSpinner from '../../components/LoadingSpinner';
import Message from '../../components/Message';
import Auth from '../../utils/Auth';

// NOTES:
// - The filter buttons do nothing
// - There is commented out code for when/if we need to display in cancelled/failed voyages in the future
// - There is commented out code for when the filter is working but there are no voyages relating to the filter

const YourPageOne = () => {
  dayjs.extend(customParseFormat);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theReturnedData, settheReturnedData] = useState();

  document.title = SERVICE_NAME;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await axios.post(THE_ENDPOINT, {}, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      });
      // go to the good page
    } catch (err) {
      // handle the error
      setIsError(err.stuff);
    }
  };

  const getData = async (signal) => {
    try {
      const response = await axios.get(THE_ENDPOINT, {
        signal,
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      });

      const sortByLatestFirst = response.sort((a, b) => dayjs(b.creationDate) - dayjs(a.creationDate));
      settheReturnedData(sortByLatestFirst);
    } catch (err) {
      if (err?.code === 'ERR_CANCELED') { return; }
      // call errorHandler here when exists
    } finally {
      setIsLoading(false);
    }
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
      <Message title="Something has gone wrong" redirectURL={PAGE_ONE_URL} />
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
          <h1 className="thisApp-heading-xl thisApp-!-margin-bottom-4">Your stuff</h1>
          {theReturnedData?.length === 0 && (
            <div className="thisApp-inset-text">
              <p className="thisApp-body">You have not got any stuff yet</p>
            </div>
          )}
          <button
            className="thisApp-button"
            data-module="thisApp-button"
            disabled={isLoading}
            type="button"
            onClick={() => { handleClick(); }}
          >
            Make some stuff
          </button>
        </div>
      </div>

      {theReturnedData?.length > 0 && (
        <>
          <div className="thisApp-grid-column-full">
            <div className="thisApp-grid-row">
              <div className="thisApp-grid-column-full">
                <h2 className="thisApp-heading-s thisApp-!-margin-bottom-1 reported-voyages-margin--top">{`${theReturnedData.length} reported voyages`}</h2>
                <div className="facet-tags__container dark-grey__border">
                  <div className="facet-tags__group">
                    <div className="facet-tags__wrapper">
                      <span id="allTag" className="facet-tag thisApp-!-padding-1">
                        <span>All types</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {theReturnedData?.map((item) => {
            let statusLinkText;
            if (item.status === 'Submitted' || item.status === 'PreSubmitted') {
              statusLinkText = 'Review or cancel';
            } else if (item.status === 'Draft') {
              statusLinkText = 'Continue';
            } else if (item.status === 'Cancelled' || item.status === 'PreCancelled') {
              statusLinkText = 'Review';
            } else if (item.status === 'Failed') {
              statusLinkText = 'Review and re-submit';
            } else {
              statusLinkText = 'Review';
            }
            return (
              <div key={item.id} className="thisApp-!-margin-top-5 light-grey__border">
                <div className="thisApp-grid-row">

                  <div className="thisApp-grid-column-one-quarter reported-items__columns reported-items__text">
                    <p className="thisApp-body-s thisApp-!-font-weight-bold">{item.name}</p>
                  </div>

                  {/* <div className="thisApp-grid-column-one-quarter reported-items__columns reported-items__text">
                    <span className="thisApp-body-s">Status</span> <br />
                    <StatusTag status={item.status} />
                  </div> */}

                  <div className="thisApp-grid-column-one-quarter reported-voyages__columns reported-voyages__text">
                    <span className="thisApp-body-s">Actions</span> <br />
                    <Link
                      to={item.status === 'Draft' ? `${THIS_ITEM_URL}?id=${item.id}` : `?id=${item.id}`}
                      className="thisApp-link small-link-text"
                    >
                      {statusLinkText}
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}

        </>
      )}
    </>
  );
};

export default YourPageOne;
