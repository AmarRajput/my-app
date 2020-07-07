import React from 'react';
// third-party imports
import { Formik } from 'formik';


export default class EventForm extends React.Component {
    
    render() {
        let regex =  new RegExp('^[0-9]+$');
       return (
        
        <div className="centred-form">
        <h1>Event Form</h1>
        <Formik
          
          initialValues={{ name: '', description: '',venue:'',price:'',discount:'' }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'This field is mandetory';
            } 
            if (!values.description) {
                errors.description = 'This field is mandetory';
            } 
            if (!values.venue) {
                errors.venue = 'This field is mandetory';
            } 
            // if (!values.price.match(regex)) {
            //     errors.price = 'Please enter a number';
            // } 
            if (!values.price) {
                errors.price = 'This field is mandetory';
            } 
            if (!values.discount.match(regex)) {
                errors.discount = 'Please enter a number';
            } 
            return errors;
          }}
          
          onSubmit={(values, { setSubmitting }) => {
            var array = JSON.parse(localStorage.getItem('Data') || '[]');
            array.push(values);
            localStorage.setItem('Data', JSON.stringify(array));
            setTimeout(() => {
              setSubmitting(true);
              window.location.reload();
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <fieldset className="material">
                        <input type="name" name="name"  onChange={handleChange} onBlur={handleBlur} value={values.name} autoComplete="off" required />
                        <hr></hr>
                        <label>Event Name</label>
                    </fieldset>
                    <span>{errors.name && touched.name && errors.name}</span>
                </div>
                <div className="field">
                    <fieldset className="material">
                        <input type="description" name="description"  onChange={handleChange} onBlur={handleBlur} value={values.description} autoComplete="off" required />
                        <hr></hr>
                        <label>Description</label>
                    </fieldset>
                    <span>{errors.description && touched.description && errors.description}</span>
                </div>
                <div className="field">
                    <fieldset className="material">
                        <input type="venue" name="venue"  onChange={handleChange} onBlur={handleBlur} value={values.venue} autoComplete="off" required />
                        <hr></hr>
                        <label>Venue</label>
                    </fieldset>
                    <span>{errors.venue && touched.venue && errors.venue}</span>
                </div>
                <div className="field">
                    <fieldset className="material">
                        <input type="price" name="price"  onChange={handleChange} onBlur={handleBlur} value={values.price} autoComplete="off" required />
                        <hr></hr>
                        <label>Price</label>
                    </fieldset>
                    <span>{errors.price && touched.price && errors.price}</span>
                </div>
                <div className="field">
                    <fieldset className="material">
                        <input type="discount" name="discount"  onChange={handleChange} onBlur={handleBlur} value={values.discount} autoComplete="off" required />
                        <hr></hr>
                        <label>Discount</label>
                    </fieldset>
                    <span>{errors.discount && touched.discount && errors.discount}</span>
                </div>
              <button type="submit" disabled={isSubmitting} className="submit">
                Submit
              </button>
              <button type="reset" onClick={resetForm} className="reset">
                Clear
              </button>
            </form>
          )}
        </Formik>
      </div>
        )
    }
}
