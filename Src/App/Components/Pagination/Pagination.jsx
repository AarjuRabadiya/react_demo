import React, { Component } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import * as variable from "Base/Variables";
import { media } from "Base/Media";

export default class Pagination extends Component {
  render() {
    let { pageCount, onPageChange, resetPagination } = this.props;

    return (
      <StyledPaginateContainer>
        {resetPagination ? (
          <SkeletonTheme
            color={variable.Active}
            highlightColor={variable.CheckboxBorder}
          >
            <Skeleton count={1} height={40} />
          </SkeletonTheme>
        ) : (
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </StyledPaginateContainer>
    );
  }
}
const StyledPaginateContainer = styled.div`
  width: 80%;
  margin: auto;
  .pagination {
    display: block;
    margin-bottom: 2px;
    ${media.tablet`
   
    display: flex;
    justify-content: center;
    text-align: center;
  `}
  }

  .previous {
    width: 100%;
  }
  .next {
    width: 100%;
  }
  li {
    padding: 0 5px;
    margin: 10px auto;
    cursor: pointer;
    border-radius: 0 10px;
    width: 100%;
    background: ${variable.Active};
    color: ${variable.cancleButton};
    border: 2px solid ${variable.CheckboxBorder};
    :hover {
      border: 1px solid ${variable.green};
      color: ${variable.green};
    }
    ${media.tablet`
    margin: auto 10px;
  `}
  }
  a {
    width: 100%;
    height: 40px;
    outline: none;
    border: none;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .break-me {
    cursor: default;
  }
  .active {
    background: ${variable.CheckboxBorder};
    color: ${variable.cancleButton};
    border: 2px solid ${variable.CheckboxBorder};
    :hover {
      color: ${variable.cancleButton};
      border: 2px solid ${variable.cancleButton};
    }
  }
`;
