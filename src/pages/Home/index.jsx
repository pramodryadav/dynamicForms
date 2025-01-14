import React, { memo } from 'react';


import useSubProjects from './hooks/useSubProjects';

import SubProjects from './components/SubProjects';
import StepperForm from './components/StepperForm';
import ProjectItems from './components/ProjectItems';
import Modal from '../../components/Modal';
import useGetProjects from './hooks/useGetProjects';



const Projects = () => {
    const {

        isCreateNewItem,
        handleClickNewItem,
        handleClickBack,
        subProjectDetail,
        handleClickExistingItem,
        handleCloseModal,
        isProcessing,
        isCompleted,
        handleSelectProject,
        selectedProject
    } = useSubProjects();
    const { projects } = useGetProjects();

    return (
        <>
            {(subProjectDetail || selectedProject) ? (
                <StepperForm
                    handleClickBack={handleClickBack}
                    subProjectDetail={subProjectDetail}
                    selectedProject={selectedProject}
                />
            ) : (
                    <SubProjects
                        handleClickExistingItem={handleClickExistingItem}
                        handleClickNewItem={handleClickNewItem}
                        handleCloseModal={handleCloseModal}
                        isProcessing={isProcessing}
                        isCompleted={isCompleted}
                        projects={projects}

                    />
                )}

            <Modal title="Projects" open={isCreateNewItem} handleClose={handleCloseModal} maxWidth="lg">
                <ProjectItems projects={projects} handleSelectProject={handleSelectProject} />
            </Modal>
        </>
    );
};

export default memo(Projects);
