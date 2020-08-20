import PubSub from "pubsub-js";

class FormioSubmissionListener {
    constructor(form, props) {
        this.form = form;
        this.props = props;
    }

    initialize() {
        this.form.formio.on('error', errors => {
            PubSub.publish('formSubmissionError', {
                errors: errors,
                form: this.form
            });
            window.scrollTo(0, 0);
        });
        this.form.formio.on('submit', () => {
            PubSub.publish('formSubmissionSuccessful');
        });
        this.form.formio.on('change', (value) => {
            PubSub.publish('formChange', value);
        });
        this.form.formio.on('prevPage', () => {
            PubSub.publish('clear');
        });
    }
}

export default FormioSubmissionListener;
