import React, { memo } from 'react';


import useCreateUpdateSubProjects from '../hooks/useCreateUpdateSubProjects';

import CreatedItems from './CreatedItems';
import CreateUpdateItem from './CreateUpdateItem';
import Projects from './Projects';
import Modal from '../../../components/Modal';



const ProjectData = () => {
    const {

        isCreateNewItem,
        handleClickNewItem,
        handleClickBack,
        subProjectDetail,
        handleClickExistingItem,
        handleReset,
        handleCloseModal,
        isProcessing,
        isCompleted,
        handleSelectProject,
        selectedProject
    } = useCreateUpdateSubProjects();


    return (
        <>
            {(subProjectDetail || selectedProject) ? (
                <CreateUpdateItem
                    handleClickBack={handleClickBack}
                    subProjectDetail={subProjectDetail}
                    handleReset={handleReset}
                    selectedProject={selectedProject}
                />
            ) : (
                    <CreatedItems
                        handleClickExistingItem={handleClickExistingItem}
                        handleClickNewItem={handleClickNewItem}
                        handleCloseModal={handleCloseModal}
                        isProcessing={isProcessing}
                        isCompleted={isCompleted}

                    />
                )}

            <Modal title="Projects" open={isCreateNewItem} handleClose={handleCloseModal} maxWidth="lg">
                <Projects handleSelectProject={handleSelectProject} />
            </Modal>
        </>
    );
};

export default memo(ProjectData);
