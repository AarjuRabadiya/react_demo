import React from "react";
import styled from "styled-components";
import * as variable from "Base/Variables";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import SelectBox from "./SelectBox";
import Assets from "./Assets";
import ReactPagination from "Components/Pagination/Pagination";
import ReactTooltip from "react-tooltip";
import { media } from "Base/Media";
import SearchIcon from "./assets/search.png";

@inject("AuthStore")
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      assets: [],
      page: 1,
      last_page: 10,
      isLoading: true,
      assetsTableArray: [],
      checkedArray: [],
      table_name: [],
      pageCount: 0,
      hashRate: { value: 1, label: "Max to min hash rate" },
      resetPagination: true,
      on_sale: 0,
      options: [
        { value: "", label: "All" },
        { value: 0, label: "Min to max hash rate" },
        { value: 1, label: "Max to min hash rate" },
      ],
      category: "",
      name: [],
    };
  }

  componentDidMount() {
    if (this.props.location.category) {
      if (this.props.location.state === "craft") {
        this.setState(
          {
            category: "Crafts/Vehicle",
            on_sale: 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
      if (this.props.location.state === "character_avatar") {
        this.setState(
          {
            category: "Characters/Beings",
            on_sale: 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
      if (this.props.location.state === "art") {
        this.setState(
          {
            category: "Symbolics/Art",
            on_sale: 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
      if (this.props.location.state === "land") {
        this.setState(
          {
            category: "Land Parcels",
            on_sale: 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
    } else {
      this.fetchAssets();
    }

    this.assetTableList();
  }
  assetTableList = () => {
    const { AuthStore } = this.props;

    let { assetsTableArray } = this.state;
    AuthStore.assetTableList().then((res) => {
      if (res.data) {
        res.data.forEach((val) => {
          let obj = {
            value: val.name,
            label: val.mongo_table,
            [val.mongo_table]: false,
            id: val.id,
          };
          assetsTableArray.push(obj);
        });
        this.setState({
          assetsTableArray,
        });
      }
    });
  };
  fetchAssets = () => {
    const { AuthStore } = this.props;
    let { page, table_name, hashRate, search, on_sale, name, category } =
      this.state;
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let payload = {
          ...(table_name.length !== 0 && { table_name: table_name }),
          ...(name.length !== 0 && { name: name }),
          ...(search && { search: search }),
          ...(category && { category: category }),
          ...(hashRate && { hashrate: hashRate.value }),
          on_sale: on_sale,
          page: page,
        };

        AuthStore.getAssets(payload).then((res) => {
          this.setState({
            assets: res.data,
            page: res.current_page,
            last_page: res.last_page,
            isLoading: false,
            // pageCount: res.total,
            pageCount: res.last_page,
            resetPagination: false,
          });
        });
      }
    );
  };
  selectOption = (selectedOption) => {
    this.setState(
      {
        hashRate: selectedOption,
        page: 1,
        resetPagination: true,
        search: "",
      },
      () => {
        this.fetchAssets();
      }
    );
  };
  pagination = (value) => {
    let { page, last_page } = this.state;
    if (value === "prev") {
      if (page > 1) {
        this.setState(
          {
            page: page - 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
    } else {
      if (last_page > page) {
        this.setState(
          {
            page: page + 1,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
    }
  };
  handleSearch = (e) => {
    this.setState(
      {
        search: e.target.value,
        page: 1,
        minHashrate: "",
        maxHashrate: "",
        resetPagination: true,
      },
      () => {
        this.fetchAssets();
      }
    );
  };
  clearAll = () => {
    this.setState(
      {
        search: "",
        assets: [],
        page: 1,
        last_page: 10,
        isLoading: true,
        table_name: [],
        hashRate: { value: 1, label: "Max to min hash rate" },
        checkedArray: [],
        pageCount: 0,
        resetPagination: true,
        on_sale: 0,
        category: "",
        name: [],
      },
      () => {
        this.fetchAssets();
      }
    );
  };
  onChecked = (e, value) => {
    e.stopPropagation();
    // console.log(value);
    let { table_name, checkedArray, name } = this.state;

    if (e.target.checked === true) {
      checkedArray.push(e.target.value);
      table_name.push(e.target.name);
      name.push(value);
      this.setState(
        {
          table_name: table_name,
          name: name,
          page: 1,
          checkedArray,
          resetPagination: true,
          search: "",
        },
        () => {
          this.fetchAssets();
        }
      );
    } else {
      checkedArray.splice(checkedArray.indexOf(e.target.value), 1);
      table_name.splice(table_name.indexOf(e.target.name), 1);
      name.splice(name.indexOf(value), 1);

      this.setState(
        {
          table_name: table_name,
          name: name,
          page: 1,
          checkedArray,
          resetPagination: true,
        },
        () => {
          this.fetchAssets();
        }
      );
    }
  };
  onPageChange = (e) => {
    this.setState(
      {
        page: e.selected + 1,
      },
      () => {
        this.fetchAssets();
      }
    );
  };
  onFilter = () => {
    let { on_sale } = this.state;
    if (on_sale !== 1) {
      this.setState(
        {
          on_sale: 1,
          resetPagination: true,
        },
        () => {
          this.fetchAssets();
        }
      );
    } else {
      this.setState(
        {
          on_sale: 0,
          resetPagination: true,
        },
        () => {
          this.fetchAssets();
        }
      );
    }
  };
  selectCategory = (selectedCategory) => {
    let { category, isLoading } = this.state;
    // console.log(selectedCategory, "selectedCategory", category);
    if (!isLoading) {
      if (category === selectedCategory) {
        this.setState(
          {
            category: "",
          },
          () => {
            this.fetchAssets();
          }
        );
      } else {
        this.setState(
          {
            category: selectedCategory,
          },
          () => {
            this.fetchAssets();
          }
        );
      }
    }
  };
  render = () => {
    let {
      assets,
      isLoading,
      assetsTableArray,
      options,
      search,
      hashRate,
      checkedArray,
      pageCount,
      resetPagination,
      on_sale,
      category,
    } = this.state;
    const { history } = this.props;
    return (
      <SearchPage>
        <LeftSection>
          <Sticy>
            <SearchHeader>
              <Header onClick={() => history.push("/login")}>
                nftmining.com
              </Header>
            </SearchHeader>
            <ButtonSection>
              {on_sale === 0 ? (
                <FilterButton
                  onClick={() => this.onFilter()}
                  disabled={isLoading}
                >
                  For Sale
                </FilterButton>
              ) : (
                <FilterForButton
                  onClick={() => this.onFilter()}
                  disabled={isLoading}
                >
                  For Sale
                </FilterForButton>
              )}
            </ButtonSection>
            <SearchBox>
              <Searchbutton>
                <img src={SearchIcon} alt="" />
              </Searchbutton>
              <SearchBoxDiv>
                <Input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  value={search}
                  onChange={(e) => this.handleSearch(e)}
                />
              </SearchBoxDiv>
            </SearchBox>
            <SelectSection>
              <SelectBox
                value={hashRate}
                handleChange={this.selectOption}
                options={options}
                border={`2px solid ${variable.CheckboxBorder}`}
                color={`${variable.whiteColor}`}
              />
            </SelectSection>
            <CheckboxSection>
              {assetsTableArray.length === 0 && !isLoading ? (
                <ErrorMessage>There are no entries available...</ErrorMessage>
              ) : (
                assetsTableArray.map((value, key) => {
                  return (
                    <CheckBox key={key}>
                      <CustomCheckBox
                        type="checkbox"
                        id={key}
                        value={value.id}
                        name={value.label}
                        checked={checkedArray.includes(value.id.toString())}
                        onChange={(e) => this.onChecked(e, value.value)}
                        disabled={isLoading ? true : false}
                      />
                      <Label
                        htmlFor={key}
                        data-for={value.value}
                        data-tip={value.value}
                      >
                        {value.value}
                      </Label>
                      <ReactTooltip
                        className="react-popover"
                        id={value.value}
                        place="top"
                        effect="solid"
                        type="info"
                      />
                    </CheckBox>
                  );
                })
              )}
            </CheckboxSection>
            <ButtonSection>
              <CancleButton onClick={() => this.clearAll()}>
                Clear All
              </CancleButton>
            </ButtonSection>
          </Sticy>
        </LeftSection>
        <RightSection>
          <RightHeader>
            {category === "Characters/Beings" && (
              <RightActiveSubHeader
                onClick={() => this.selectCategory("Characters/Beings")}
              >
                Characters / Beings
              </RightActiveSubHeader>
            )}
            {category !== "Characters/Beings" && (
              <RightSubHeader
                onClick={() => this.selectCategory("Characters/Beings")}
              >
                Characters / Beings
              </RightSubHeader>
            )}
            {category === "Crafts/Vehicle" && (
              <RightActiveSubHeader
                onClick={() => this.selectCategory("Crafts/Vehicle")}
              >
                Crafts / Vehicle
              </RightActiveSubHeader>
            )}
            {category !== "Crafts/Vehicle" && (
              <RightSubHeader
                onClick={() => this.selectCategory("Crafts/Vehicle")}
              >
                Crafts / Vehicle
              </RightSubHeader>
            )}
            {category === "Symbolics/Art" && (
              <RightActiveSubHeader
                onClick={() => this.selectCategory("Symbolics/Art")}
              >
                Symbolics / Art
              </RightActiveSubHeader>
            )}
            {category !== "Symbolics/Art" && (
              <RightSubHeader
                onClick={() => this.selectCategory("Symbolics/Art")}
              >
                Symbolics / Art
              </RightSubHeader>
            )}
            {category === "Land Parcels" && (
              <RightActiveSubHeader
                onClick={() => this.selectCategory("Land Parcels")}
              >
                Land Parcels
              </RightActiveSubHeader>
            )}
            {category !== "Land Parcels" && (
              <RightSubHeader
                onClick={() => this.selectCategory("Land Parcels")}
              >
                Land Parcels
              </RightSubHeader>
            )}
          </RightHeader>

          {assets.length === 0 && !isLoading ? (
            <ErrorMessage>There are no entries available...</ErrorMessage>
          ) : (
            <AssetsTheme>
              <Assets
                assets={assets}
                isLoading={isLoading}
                history={history}
                on_sale={on_sale}
              />

              <ReactPagination
                pageCount={pageCount}
                onPageChange={(e) => this.onPageChange(e)}
                isLoading={isLoading}
                resetPagination={resetPagination}
              />
            </AssetsTheme>
          )}
        </RightSection>
      </SearchPage>
    );
  };
}
const RightHeader = styled.div`
  overflow: scroll;
  display: flex;
  width: 100%;
  border-bottom: 4px solid ${variable.textColorDark};
  padding: 10px;
  background: ${variable.themeColor};
  top: 0;
  position: sticky;
  ${media.tablet`
    overflow: hidden;
    width: 100%;
  `}
`;
const RightSubHeader = styled.div`
  width: 100%;
  padding: 15px;
  text-align: center;
  :hover {
    background: ${variable.textColorDark};
    border-radius: 5px;
    color: ${variable.cancleButton};
    font-weight: bold;
    cursor: pointer;
  }
  ${media.tablet`
    width: calc(100% / 4);
    padding: 10px;
  `}
`;
const RightActiveSubHeader = styled.div`
  width: 100%;
  padding: 15px;
  text-align: center;
  background: ${variable.textColorDark};
  border-radius: 5px;
  color: ${variable.cancleButton};
  font-weight: bold;
  cursor: pointer;

  ${media.tablet`
    width: calc(100% / 4);
    padding: 10px;
  `}
`;
const SearchPage = styled.div`
  background: ${variable.themeColor};
  min-height: 100vh;
  color: ${variable.whiteColor};
  display: block;
  width: 100%;

  ${media.tablet`
    display: flex;
    width: 100%;
  `}
`;
const Input = styled.input`
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
  height: 40px;
  margin-right: auto;
  padding-left: 5px;
  margin-bottom: 5px;
  background: transparent;
  color: ${variable.whiteColor};
  border-left: none !important;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 0px 5px 5px 0px;
  font-size: ${variable.textLarge};

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 5px;
`;
const LeftSection = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-style: solid;
  border-bottom-color: rgb(64, 198, 188);
  ${media.tablet`
  width: calc(100% - 80%);
  border-right-style: solid;
  border-right-color: rgb(64, 198, 188);
    `}
`;
const Sticy = styled.div`
  position: sticky;
  z-index: 11111;
  top: 0;
`;
const SearchHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Header = styled.div`
  justify-content: center;
  font-size: ${variable.textLarge};
  font-weight: ${variable.bold};
  color: rgb(64, 198, 188);
  cursor: pointer;
  text-align: center;
  padding: 10px;
`;
const SearchBox = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  margin: 20px auto;
`;
const SearchBoxDiv = styled.div`
  display: flex;
  width: 100%;
`;
const Searchbutton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 35px;
  background: transparent;
  color: ${variable.whiteColor};
  border-right: none !important;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 5px 0px 0px 5px;
  padding-left: 10px;
`;
const SelectSection = styled.div``;
const CustomCheckBox = styled.input.attrs({ type: "checkbox" })`
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;

  :checked + ${Label}:after {
    content: "";
    display: block;
    position: absolute;
    top: 5px;
    left: 9px;
    width: 6px;
    height: 12px;
    border: solid ${variable.Checked};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
const Label = styled.label`
   {
    position: relative;
    cursor: pointer;
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  :before {
    content: "";
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid ${variable.CheckboxBorder};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
  }
`;
const CheckboxSection = styled.div`
  margin: 10px auto;
`;
const CheckBox = styled.div`
  padding: 5px 0px;
  display: flex;
  align-items: center;
`;

const ButtonSection = styled.div`
  width: 100%;
  margin: auto;
`;
const CancleButton = styled.button`
  height: 40px;
  background: ${variable.CheckboxBorder};
  // background-image: linear-gradient(to right, #083552, #004974, #005e98, #0074be, #008ae5);
  font-weight: ${variable.bold};
  color: #c3daec;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 0 10px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: ${variable.textMedium};
`;
const FilterButton = styled.button`
  height: 40px;
  background: ${variable.Active};
  font-weight: ${variable.bold};
  // color: ${variable.Checked};
  color: #2e83bf;
  border: 2px solid ${variable.CheckboxBorder};
  border-radius: 0 10px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: ${variable.textMedium};
  :hover {
    box-shadow: 0px 0px 10px 0px;
  }
`;
const FilterForButton = styled.button`
  height: 40px;
  background: ${variable.CheckboxBorder};
  font-weight: ${variable.bold};
  // color: ${variable.cancleButton};
  color: #b3d3ec;
  border: 2px solid #5785ac;
  border-radius: 0 10px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: ${variable.textMedium};
  :hover {
    box-shadow: 0px 0px 10px 0px;
  }
`;
const RightSection = styled.div`
  width: 100%;
  // padding: 20px;
  padding: 0px 0px 20px 0px;
  ${media.tablet`
  width: calc(100% - 20%);
    `}
`;
const AssetsTheme = styled.div`
  min-height: calc(100vh - 80px);
`;
const ErrorMessage = styled.div`
  background-color: ${variable.textColorDark};
  border: 2px solid ${variable.CheckboxBorder};
  height: 60px;
  margin: 40px 10px;
  padding: 20px;
  border-radius: 0 10px;
`;
export default withTranslation()(Search);
