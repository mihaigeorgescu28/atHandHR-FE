import React from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

// success message for disabling employee
export const disableEmployeeSuccess = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      success
      title="Success"
      onConfirm= {confirmAction} 
      onCancel= {cancelAction}
    > The employee was successfully disabled!
    </ReactBSAlert>
  );
};

// success message for deleting record
export const deleteRecordSuccess = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      success
      title="Success"
      onConfirm= {confirmAction} 
      onCancel= {cancelAction}
    > The record was successfully deleted!
    </ReactBSAlert>
  );
};

// success message for updating record
export const updateRecordSuccess = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      success
      title="Success!"
      onConfirm={confirmAction}
      onCancel= {cancelAction}
    > The record was successfully updated!
    </ReactBSAlert>
  );
};

// success message for inserting record
export const insertRecordSuccess = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      success
      title="Success!"
      onConfirm={confirmAction}
      onCancel= {cancelAction}
    > The record was successfully inserted!
    </ReactBSAlert>
  );
};

// alert message for disabling employee
export const confirmationDisableEmployee = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to delete this employee?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};

// alert message for deleting generic record
export const confirmationDeleteRecord = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to delete this record?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};

// alert message for disabling employee
export const confirmationResetPassword = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to reset password for this employee?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};


export const confirmationResetPasswordUserProfile = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to reset your password?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};

// success message for resetting password
export const resetPasswordSuccess = (confirmAction) => {
  return (
    <ReactBSAlert
      success
      title="Success"
      onConfirm={confirmAction}
    > Reset password request was successfully sent! 
    </ReactBSAlert>
  );
};

// success message for disabling employee
export const userUpdatedSuccess = (confirmAction) => {
  return (
    <ReactBSAlert
      success
      title="Success!"
      onConfirm={confirmAction}
    > Details were successfully updated!
    </ReactBSAlert>
  );
};

// success message for disabling employee
export const createNewUserSuccess = (confirmAction, temporaryPassword) => {
  return (
    <ReactBSAlert
  success
  title="Success"
  onConfirm={confirmAction}
> 
  <span style={{ color: 'black' }}>
    The user can login using temporary password: <strong>{temporaryPassword}</strong> and will be asked to change it on first login. 
    An email with these details was also sent to the user!
  </span>
</ReactBSAlert>


  );
};

export const errorAlert = (confirmAction) => {
  return (
    <ReactBSAlert
    error
    title="Error!"
    onConfirm={confirmAction}
  >
    Something went wrong! Please contact IT!
    </ReactBSAlert>
  );
};

export const errorExistingEmail = (confirmAction) => {
  return (
    <ReactBSAlert
    error
    title="Error!"
    onConfirm={confirmAction}
  >
    The personal email address already exists! Please choose another one.
    </ReactBSAlert>
  );
};

export const errorNoEmail = (confirmAction) => {
  return (
    <ReactBSAlert
    error
    title="Error!"
    onConfirm={confirmAction}
  >
    Please make sure you enter a valid personal email address!
    </ReactBSAlert>
  );
};

export const errorInvalidData = (confirmAction) => {
  return (
    <ReactBSAlert
    error
    title="Error!"
    onConfirm={confirmAction}
  >
    It seems there is a problem with the information you entered. Please fix the errors and try again!
    </ReactBSAlert>
  );
};

export const confirmationApproveLeave = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to approve this leave request?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};

export const confirmationDeclineLeave = (confirmAction, cancelAction) => {
  return (
    <ReactBSAlert
      warning
      confirmBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      cancelBtnText="Yes"
      showCancel
      title="Are you sure you want to decline this leave request?"
      onConfirm={confirmAction}
      onCancel={cancelAction}
      focusCancelBtn
    />
  );
};

// message for sign in out
export const signInOutSuccess = (confirmAction, cancelAction, buttonText) => {
  return (
    <ReactBSAlert
      success
      title="Success"
      onConfirm= {confirmAction} 
      onCancel= {cancelAction}
    > {buttonText}
    </ReactBSAlert>
  );
};

export const errorsignInOut = (confirmAction, buttonText) => {
  return (
    <ReactBSAlert
    warning
    title="Warning!"
    onConfirm={confirmAction}
  >
    {buttonText}
    </ReactBSAlert>
  );
};
