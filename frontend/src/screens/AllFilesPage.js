import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getFiles } from '../actions/fileActions';
import FileBox from '../components/FileBox';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AllFilesPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userFiles = useSelector((state) => state.getFiles);
   const { files, loading } = userFiles;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         dispatch(getFiles());
      }
   }, [user, loggedUser, navigate, dispatch]);

   return (
      <div className="landing-page">
         <div className="favorite-files">
            <div className="head">
               <h4>All Files</h4>
            </div>
            {loading ? (
               <Loader />
            ) : msg ? (
               <Message msg={msg} variant="error" />
            ) : files.length === 0 ? (
               <Message msg="You have no files!" variant="success" box />
            ) : (
               <>
                  <div className="content">
                     {files.map((file) => (
                        <FileBox key={file._id} file={file} />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default AllFilesPage;