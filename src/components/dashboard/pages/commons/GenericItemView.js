import React, { useState } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../commons/SimplePageHeader";
import { Redirect, useParams } from "react-router";
import Box from "@material-ui/core/Box";
import SimpleViewTable from "../commons/SimpleViewTable";
import useFetch from "use-http";
import SimpleViewCard from "../commons/SimpleViewCard";
import DeleteModal from "../commons/DeleteModal";
import PropTypes from "prop-types";

export default function GenericItemView({
  pageHeaderTitle,
  endPointPaths,
  viewContainerProps,
}) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title={pageHeaderTitle}
        buttonProps={{
          title: "Regresar",
          to: endPointPaths.itemPath,
          startIcon: <ArrowBack />,
        }}
      />
      <ViewContainer endPointPaths={endPointPaths} {...viewContainerProps} />
    </React.Fragment>
  );
}

function ViewContainer({
  keysData,
  customItemView: CustomItemView,
  protectedErrorMessage,
  endPointPaths,
}) {
  const { id } = useParams();
  const { data: detailData = {} } = useFetch(
    endPointPaths.getDetailEndPoint(id),
    []
  );
  const [modal, setModal] = useState(false);

  const onSuccessDelete = () => <Redirect to={endPointPaths.itemPath} />;

  return (
    <React.Fragment>
      {modal && (
        <DeleteModal
          open={modal}
          setModal={setModal}
          deletePath={endPointPaths.getDetailEndPoint(id)}
          protectedErrorMessage={protectedErrorMessage}
          onSuccessDelete={onSuccessDelete}
        ></DeleteModal>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        {CustomItemView ? (
          <CustomItemView
            detailData={detailData}
            footerProps={{
              onDelete: () => setModal(true),
              updatePath: endPointPaths.updatePath(id),
            }}
          />
        ) : (
          <SimpleViewCard
            onDelete={() => setModal(true)}
            updatePath={endPointPaths.updatePath(id)}
          >
            <SimpleViewTable keysData={keysData} data={detailData} />
          </SimpleViewCard>
        )}
      </Box>
    </React.Fragment>
  );
}

GenericItemView.propTypes = {
  pageHeaderTitle: PropTypes.string.isRequired,
  endPointPaths: PropTypes.object.isRequired,
  viewContainerProps: PropTypes.exact({
    keysData: PropTypes.array,
    customItemView: PropTypes.func,
    protectedErrorMessage: PropTypes.string,
  }),
};
