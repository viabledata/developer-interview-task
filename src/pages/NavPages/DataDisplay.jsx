import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const DataDisplay = ({ data }) => {
  const getActionButtontext = (status) => {
    let actionText;
    switch (status) {
      case 'Draft':
        actionText = 'Continue';
        break;
      case 'Confirmed':
        actionText = 'Review or cancel';
        break;
      case 'Cancelled':
        actionText = 'Review';
        break;
      default:
        actionText = 'Review';
    }
    return actionText;
  };

  return (
    <>
      <hr />
      <br />

      <div className="govuk-grid-row your-items__flex">
        <div className="govuk-grid-column-full">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h2 className="govuk-heading-s govuk-!-margin-bottom-1 reported-items-margin--top">{`${data.length} reported items`}</h2>
              <div className="facet-tags__container dark-grey__border">
                <div className="facet-tags__group">
                  <div className="facet-tags__wrapper">
                    <span id="allTag" className="facet-tag govuk-!-padding-1">
                      <span>All report types</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {data?.map((item) => (
            <div key={item.id} className="govuk-!-margin-top-5 light-grey__border">
              <div className="govuk-grid-row">

                <div className="govuk-grid-column-one-quarter reported-items__columns reported-items__text">
                  <p className="govuk-body-s govuk-!-font-weight-bold">{item.name}</p>
                </div>

                <div className="govuk-grid-column-one-quarter reported-items__columns reported-items__text">
                  <p className="govuk-body-s">
                    Date:
                    <br />
                    {dayjs(item.creationDate).format('DD MMMM YYYY')}
                  </p>
                </div>

                <div className="govuk-grid-column-one-quarter reported-items__columns reported-items__text">
                  <span className="govuk-body-s">Actions</span> <br />
                  <Link
                    to={item.status === 'Draft' ? '/item?status=draft' : '/item?status=confirmed'}
                    className="govuk-link small-link-text"
                  >
                    {getActionButtontext(item.status)}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default DataDisplay;

DataDisplay.propTypes = {
  data: PropTypes.array,
};
