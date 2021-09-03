import React from "react";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import Loaderspinner from "react-loader-spinner";
import i18n from "i18next";
import { media } from "Base/Media";
import * as variable from "Base/Variables";
import Layout from "Components/Layout/Layout";
import Button from "Components/Buttons/Button";
import Loader from "Components/Loader/Loader";
import Select from "Components/Select/Select";
import ReactPagination from "Components/Pagination/Pagination";
import MiningDetail from "./MiningTeamDetail";
import AssetDetails from "./AssetDetails";
import "../../../app.scss";
import "../../../main.scss";
import "./mining.scss";

const assetType = [
  { type: "character_avatar" },
  { type: "craft" },
  { type: "art" },
  { type: "land" },
];
@inject("AuthStore", "MiningStore")
@observer
class MiningContainer extends React.Component {
  constructor(props) {
    super();

    this.state = {
      dataLoading: false,
      characterAssets: [],
      assetDetails: [],
      craft: [],
      craftDetails: [],
      symbolics_Art: [],
      artDetails: [],
      land: [],
      landDetails: [],
      selectAssets: false,
      selectCraft: false,
      selectArt: false,
      selectLand: false,
      selectAssets_TableName: "",
      selectCraft_TableName: "",
      selectArt_TableName: "",
      selectLand_TableName: "",
      miningPayload: {},
      miningobj: {},
      alertmess: "",
      alert: "",
      assetTitle: "",
      participating: false,
      earn_capacity: 0,
      miningTime: "",
      isLoading: false,
      isStopMining: false,
      options: [],
      shortingOptions: [
        { value: 0, label: "asc" },
        { value: 1, label: "desc" },
      ],
      selectShortValue: { value: 1, label: "asc" },
      owner_changed: false,
      selectedValue: { value: "", label: "Select assets" },
      miningTeamDetails: [],
      page: 1,
      pageCount: 10,
      assetLoading: false,
      next_page_url: "",
      selectTable: "",
      resetPagination: false,
      isLandLoading: false,
    };
  }
  componentDidMount() {
    // this.props.loadBg("mining");
    // this.props.isLoadingFalse();
    this.fetchMiningList();
    this.characterList();
    this.craftList();
    this.landList();
    this.artList();
  }
  checkImageExists = (url) => {
    let img;

    try {
      img = require(`Pages/Dashboard/Mining2.0/assets/${url}@2x.png`);
    } catch (e) {
      img = require(`Pages/Dashboard/Mining2.0/assets/default@2x.png`);
    }

    return img;
  };
  fetchMiningList = () => {
    this.setState({
      dataLoading: true,
    });
    const { MiningStore, AuthStore } = this.props;

    MiningStore.getMiningList(AuthStore.token).then((res) => {
      this.setState({
        dataLoading: false,
      });
      if (res.participating) {
        this.setState({
          participating: res.participating,
          earn_capacity: res.earn_capacity,
          dataLoading: false,
          miningTime: res.ago,
          owner_changed: res.owner_changed,
          miningTeamDetails: res.mining_team,
        });
      }
      if (res.tokens === undefined && res.participating === undefined) {
        this.setState({
          assetTitle: "Assets are not available for mining...",
          dataLoading: false,
        });
      }
    });
  };
  openAsset = (assetDetails, key) => {
    if (key === "characterAssets") {
      let options = {
        value: assetDetails.table_name,
        label: `${assetDetails.table_name} (${assetDetails.items.length})`,
        item: assetDetails.items,
      };
      this.setState({
        selectAssets: true,
        assetDetails: assetDetails.items,
        selectAssets_TableName: assetDetails.table_name,
        selectedValue: options,
      });
    }
    if (key === "craft") {
      let options = {
        value: assetDetails.table_name,
        label: `${assetDetails.table_name} (${assetDetails.items.length})`,
        item: assetDetails.items,
      };
      this.setState({
        selectCraft: true,
        craftDetails: assetDetails.items,
        selectedValue: options,
        selectCraft_TableName: assetDetails.table_name,
      });
    }
    if (key === "symbolics_Art") {
      let options = {
        value: assetDetails.table_name,
        label: `${assetDetails.table_name} (${assetDetails.items.length})`,
        item: assetDetails.items,
      };
      this.setState({
        selectArt: true,
        artDetails: assetDetails.items,
        selectArt_TableName: assetDetails.table_name,
        selectedValue: options,
      });
    }
    if (key === "land") {
      let options = {
        value: assetDetails.table_name,
        label: `${assetDetails.table_name} (${assetDetails.items.data.length})`,
        item: assetDetails.items.data,
      };

      this.setState({
        selectLand: true,
        selectedValue: options,
        landDetails: assetDetails.items.data,
        next_page_url: assetDetails.items.next_page_url,
        selectLand_TableName: assetDetails.table_name,
      });
    }
  };
  startMining = (e, obj, key) => {
    e.preventDefault();
    let {
      miningPayload,
      selectLand_TableName,
      miningobj,
      selectAssets_TableName,
      selectCraft_TableName,
      selectArt_TableName,
    } = this.state;
    if (key === "characterAssets") {
      let character_avatar = {
        id: obj.token_id ? obj.token_id : obj.assetId,
        hashrate: obj.hashrate,
        capacity: obj.capacity,
        table_name: selectAssets_TableName,
        owner_changed: false,
      };
      miningPayload.character_avatar = character_avatar;
      miningobj.character_avatar = obj;
      this.setState({
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
      });
    }
    if (key === "craft") {
      let craft = {
        id: obj.token_id ? obj.token_id : obj.assetId,
        hashrate: obj.hashrate,
        capacity: obj.capacity,
        owner_changed: false,
        table_name: selectCraft_TableName,
      };
      miningPayload.craft = craft;
      miningobj.craft = obj;
      this.setState({
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
      });
    }
    if (key === "symbolics_Art") {
      let symbolics_Art = {
        id: obj.token_id ? obj.token_id : obj.assetId,
        hashrate: obj.hashrate,
        luck: obj.luck,
        owner_changed: false,
        table_name: selectArt_TableName,
      };
      miningPayload.symbolics_Art = symbolics_Art;
      miningobj.symbolics_Art = obj;
      this.setState({
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
      });
    }
    if (key === "land") {
      let land = {
        id: obj.token_id ? obj.token_id : obj.assetId,
        isPublic: true,
        owner_changed: false,
        table_name: selectLand_TableName,
      };
      miningPayload.land = land;
      miningobj.land = obj;
      this.setState({
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
      });
    }
  };
  ContinueMining = () => {
    let { miningPayload } = this.state;
    const { MiningStore, AuthStore } = this.props;
    this.setState({
      isLoading: true,
      dataLoading: true,
    });
    MiningStore.startTeamMining(miningPayload, AuthStore.token).then((res) => {
      if (res.error) {
        this.setState({
          alertmess: res.msg,
          alert: true,
          isLoading: false,
          dataLoading: false,
        });
      } else {
        this.resetState();
      }
    });
  };
  handleAlertClose = () => {
    this.setState({
      alertmess: "",
      alert: false,
    });
  };
  resetState = () => {
    this.setState(
      {
        characterAssets: [],
        assetDetails: [],
        craft: [],
        craftDetails: [],
        symbolics_Art: [],
        artDetails: [],
        land: [],
        landDetails: [],
        next_page_url: "",
        selectAssets: false,
        selectCraft: false,
        selectArt: false,
        selectLand: false,
        selectAssets_TableName: "",
        selectCraft_TableName: "",
        selectArt_TableName: "",
        selectLand_TableName: "",
        miningPayload: {},
        miningobj: {},
        alertmess: "",
        alert: "",
        participating: false,
        earn_capacity: 0,
        page: 1,
        miningTime: "",
        owner_changed: false,
        isLoading: false,
        isStopMining: false,
        selectedValue: { value: "", label: "Select assets" },
        selectShortValue: { value: 1, label: "asc" },
        miningTeamDetails: [],
        assetLoading: false,
        options: [],
        selectTable: "",
        isLandLoading: false,
      },
      () => {
        this.fetchMiningList();
        this.characterList();
        this.craftList();
        this.landList();
        this.artList();
      }
    );
  };
  selectAssetDetails = (isAddress) => {
    if (isAddress === "address") {
      this.setState({
        assetLoading: false,
        characterAssets: [],
        options: [],
        selectedValue: { value: "", label: "Select assets" },
        selectAssets: false,
        selectTable: "character_avatar",
      });
    } else {
      let { characterAssets, miningPayload } = this.state;

      this.setState({
        assetLoading: false,
      });
      let options = [];
      characterAssets &&
        characterAssets.map((obj) => {
          if (miningPayload && miningPayload.character_avatar !== undefined) {
            if (miningPayload.character_avatar.table_name === obj.table_name) {
              this.setState({
                selectedValue: {
                  value: obj.table_name,
                  label: `${obj.table_name} (${obj.items.length})`,
                  item: obj.items,
                },
                assetDetails: obj.items,
              });
            }
          } else {
            this.setState({
              selectedValue: { value: "", label: "Select assets" },
            });
          }
          let newObj = {
            value: obj.table_name,
            label: `${obj.table_name} (${obj.items.length})`,
            item: obj.items,
          };
          options.push(newObj);
          this.setState({
            selectTable: "character_avatar",
            options: options,
            selectAssets:
              miningPayload && miningPayload.character_avatar !== undefined
                ? true
                : false,
          });
        });
    }
  };
  selectCraftDetails = (isAddress) => {
    if (isAddress === "address") {
      this.setState({
        assetLoading: false,
        craft: [],
        selectCraft: false,
        selectedValue: { value: "", label: "Select assets" },
        selectTable: "craft",
        options: [],
      });
    } else {
      let { craft, miningPayload } = this.state;

      this.setState({
        assetLoading: false,
      });
      let options = [];
      craft.map((obj) => {
        if (miningPayload && miningPayload.craft !== undefined) {
          if (miningPayload.craft.table_name === obj.table_name) {
            this.setState({
              selectedValue: {
                value: obj.table_name,
                label: `${obj.table_name} (${obj.items.length})`,
                item: obj.items,
              },
              craftDetails: obj.items,
            });
          }
        } else {
          this.setState({
            selectedValue: { value: "", label: "Select assets" },
          });
        }
        let newObj = {
          value: obj.table_name,
          label: `${obj.table_name} (${obj.items.length})`,
          item: obj.items,
        };
        options.push(newObj);
        this.setState({
          selectTable: "craft",
          options: options,
          selectCraft:
            miningPayload && miningPayload.craft !== undefined ? true : false,
        });
      });
    }
  };
  selectLandDetails = (isAddress) => {
    if (isAddress === "address") {
      this.setState({
        assetLoading: false,
        options: [],
        land: [],
        selectedValue: { value: "", label: "Select assets" },
        selectLand: false,
        selectTable: "land",
        assetLoading: false,
      });
    } else {
      let { land, miningPayload } = this.state;

      this.setState({
        assetLoading: false,
      });
      let options = [];
      land.map((obj) => {
        if (miningPayload && miningPayload.land !== undefined) {
          if (miningPayload.land.table_name === obj.table_name) {
            this.setState({
              selectedValue: {
                value: obj.table_name,
                label: `${obj.table_name} (${obj.items.data.length})`,
                item: obj.items,
              },
              landDetails: obj.items.data,
            });
          }
        } else {
          this.setState({
            selectedValue: { value: "", label: "Select assets" },
          });
        }
        let newObj = {
          value: obj.table_name,
          label: `${obj.table_name} (${obj.items.data.length})`,
          item: obj.items.data,
        };
        options.push(newObj);
        this.setState({
          selectTable: "land",
          options: options,
          selectLand:
            miningPayload && miningPayload.land !== undefined ? true : false,

          assetLoading: false,
        });
      });
    }
  };
  selectArtDetails = (isAddress) => {
    if (isAddress === "address") {
      this.setState({
        assetLoading: false,
        symbolics_Art: [],
        selectArt: false,
        selectTable: "art",
        selectedValue: { value: "", label: "Select assets" },
        options: [],
      });
    } else {
      let options = [];
      this.setState({
        assetLoading: false,
      });
      let { symbolics_Art, miningPayload } = this.state;

      symbolics_Art.map((obj) => {
        if (miningPayload && miningPayload.symbolics_Art !== undefined) {
          if (miningPayload.symbolics_Art.table_name === obj.table_name) {
            this.setState({
              selectedValue: {
                value: obj.table_name,
                label: `${obj.table_name} (${obj.items.length})`,
                item: obj.items,
              },
              artDetails: obj.items,
            });
          }
        } else {
          this.setState({
            selectedValue: { value: "", label: "Select assets" },
          });
        }
        let newObj = {
          value: obj.table_name,
          label: `${obj.table_name} (${obj.items.length})`,
          item: obj.items,
        };
        options.push(newObj);
        this.setState({
          selectTable: "art",
          options: options,
          selectArt:
            miningPayload && miningPayload.symbolics_Art !== undefined
              ? true
              : false,
        });
      });
    }
  };
  selectTable = (table_name) => {
    let { characterAssets, craft, land, symbolics_Art } = this.state;

    if (table_name === "character_avatar") {
      if (characterAssets.length === 0) {
        this.selectAssetDetails("address");
      } else {
        this.selectAssetDetails("");
      }
    }
    if (table_name === "craft") {
      if (craft.length === 0) {
        this.selectCraftDetails("address");
      } else {
        this.selectCraftDetails("");
      }
    }
    if (table_name === "land") {
      if (land.length === 0) {
        this.selectLandDetails("address");
      } else {
        this.selectLandDetails("");
      }
    }
    if (table_name === "art") {
      if (symbolics_Art.length === 0) {
        this.selectArtDetails("address");
      } else {
        this.selectArtDetails("");
      }
    }
  };
  characterList = () => {
    let { MiningStore, AuthStore } = this.props;

    let payload = { type: "character_avatar" };
    MiningStore.miningLists(payload, AuthStore.token).then((res) => {
      if (res.tokens) {
        for (var i = 0; i < Object.keys(res.tokens).length; i++) {
          var key = Object.keys(res.tokens)[i];
          var tk_array = res.tokens[key];

          this.setState({
            characterAssets: tk_array.character_avatar,
            assetLoading: false,
          });
        }
      }
    });
  };
  craftList = () => {
    let { MiningStore, AuthStore } = this.props;

    let payload = { type: "craft" };
    MiningStore.miningLists(payload, AuthStore.token).then((res) => {
      if (res.tokens) {
        for (var i = 0; i < Object.keys(res.tokens).length; i++) {
          var key = Object.keys(res.tokens)[i];
          var tk_array = res.tokens[key];

          this.setState({
            craft: tk_array.craft,
            assetLoading: false,
          });
        }
      }
    });
  };
  landList = () => {
    let { MiningStore, AuthStore } = this.props;
    let { page, selectShortValue } = this.state;
    let payload = { type: "land", sort: selectShortValue.value };
    MiningStore.miningLists(payload, AuthStore.token, page).then((res) => {
      if (res.tokens) {
        for (var i = 0; i < Object.keys(res.tokens).length; i++) {
          var key = Object.keys(res.tokens)[i];
          var tk_array = res.tokens[key];

          this.setState({
            land: tk_array.land,
            assetLoading: false,
          });
        }
      }
    });
  };
  artList = () => {
    let { MiningStore, AuthStore } = this.props;

    let payload = { type: "symbolics_Art" };
    MiningStore.miningLists(payload, AuthStore.token).then((res) => {
      if (res.tokens) {
        for (var i = 0; i < Object.keys(res.tokens).length; i++) {
          var key = Object.keys(res.tokens)[i];
          var tk_array = res.tokens[key];

          this.setState({
            symbolics_Art: tk_array.symbolics_Art,
            assetLoading: false,
          });
        }
      }
    });
  };
  StopMining = (e) => {
    this.setState({
      isStopMining: true,
      dataLoading: true,
    });
    const { MiningStore, AuthStore } = this.props;
    MiningStore.stopMining(AuthStore.token).then((res) => {
      if (res.error) {
        this.setState({
          alertmess: res.msg,
          alert: true,
          isStopMining: false,
          dataLoading: false,
        });
      } else {
        this.resetState();
      }
    });
  };
  back = (obj) => {
    let { miningPayload, miningobj } = this.state;

    if (obj === "character_avatar") {
      delete miningPayload[obj];
      delete miningobj[obj];
      this.setState({
        assetDetails: [],
        selectAssets: false,
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
        selectedValue: { value: "", label: "Select assets" },
      });
    }
    if (obj === "craft") {
      delete miningPayload[obj];
      delete miningobj[obj];
      this.setState({
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
        craftDetails: [],
        selectCraft: false,
        selectedValue: { value: "", label: "Select assets" },
      });
    }
    if (obj === "symbolics_Art") {
      delete miningPayload[obj];
      delete miningobj[obj];
      this.setState({
        artDetails: [],
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
        selectArt: false,
        selectedValue: { value: "", label: "Select assets" },
      });
    }
    if (obj === "land") {
      delete miningPayload[obj];
      delete miningobj[obj];
      this.setState({
        landDetails: [],
        next_page_url: "",
        selectLand: false,
        ...(miningPayload && { miningPayload }),
        ...(miningobj && { miningobj }),
        selectedValue: { value: "", label: "Select assets" },
        page: 1,
      });
    }
  };
  selectOption = (selectedOption) => {
    let { selectTable } = this.state;

    if (selectTable === "character_avatar") {
      this.setState({
        assetDetails: selectedOption.item,
        selectedValue: selectedOption,
        selectAssets_TableName: selectedOption.value,
        selectAssets: true,
      });
    }
    if (selectTable === "craft") {
      this.setState({
        selectedValue: selectedOption,
        craftDetails: selectedOption.item,
        selectCraft_TableName: selectedOption.value,
        selectCraft: true,
      });
    }
    if (selectTable === "art") {
      this.setState({
        selectedValue: selectedOption,
        artDetails: selectedOption.item,
        selectArt_TableName: selectedOption.value,
        selectArt: true,
      });
    }
    if (selectTable === "land") {
      this.setState(
        {
          selectedValue: selectedOption,
          // landDetails: selectedOption.item,
          selectLand_TableName: selectedOption.value,
          selectLand: true,
          resetPagination: true,
        },
        () => {
          this.onPageChange({ selected: 0 });
        }
      );
    }
  };
  selectshortOption = (selectedOption) => {
    let { selectTable, selectLand_TableName } = this.state;

    if (selectTable === "land" && selectLand_TableName !== "") {
      this.setState(
        {
          selectShortValue: selectedOption,
          selectLand: true,
          resetPagination: true,
        },
        () => {
          this.onPageChange({ selected: 0 });
        }
      );
    }
  };
  onPageChange = (e) => {
    let { MiningStore, AuthStore } = this.props;
    let { selectShortValue } = this.state;
    this.setState(
      {
        page: e.selected + 1,
        isLandLoading: true,
      },
      () => {
        let { page } = this.state;
        let payload = { type: "land", sort: selectShortValue.value };
        let options = [];
        MiningStore.miningLists(payload, AuthStore.token, page).then((res) => {
          this.setState({
            isLandLoading: false,
          });
          for (var i = 0; i < Object.keys(res.tokens).length; i++) {
            var key = Object.keys(res.tokens)[i];
            var tk_array = res.tokens[key];

            this.setState(
              {
                land: tk_array.land,
              },
              () => {
                let { land } = this.state;

                land.map((obj) => {
                  let newObj = {
                    value: obj.table_name,
                    label: `${obj.table_name} (${obj.items.data.length})`,
                    item: obj.items.data,
                  };
                  options.push(newObj);
                  this.setState({
                    options: options,
                    resetPagination: false,
                  });

                  if (this.state.selectedValue.value === obj.table_name) {
                    this.setState({
                      landDetails: obj.items.data,
                      next_page_url: obj.items.next_page_url,
                    });
                  }
                });

                // this.setState({
                //   landDetails: land.items.data,
                //   next_page_url: land.items.next_page_url,
                // });
              }
            );
          }
        });
      }
    );
  };
  render = () => {
    let {
      dataLoading,
      characterAssets,
      land,
      symbolics_Art,
      craft,
      selectArt,
      selectCraft,
      selectAssets,
      selectLand,
      landDetails,
      next_page_url,
      craftDetails,
      assetDetails,
      artDetails,
      miningPayload,
      miningobj,
      selectTable,
      participating,
      earn_capacity,
      assetTitle,
      miningTime,
      owner_changed,
      isLoading,
      isStopMining,
      options,
      selectedValue,
      miningTeamDetails,
      assetLoading,
      resetPagination,
      isLandLoading,
      selectShortValue,
      shortingOptions,
    } = this.state;
    let { history } = this.props;

    return (
      <Layout
        title={i18n.t("menu:mining")}
        changeLanguage={(e) => this.props.changeLanguage(e)}
      >
        {this.state.alert && (
          <div className="main-alert-div">
            <div className="alert">
              <div className="message">
                <b>{this.state.alertmess}</b>
              </div>
              <div className="close" onClick={() => this.handleAlertClose()}>
                ×
              </div>
            </div>
          </div>
        )}
        {dataLoading ? (
          <Loader />
        ) : assetTitle ? (
          <div className="team-mining">
            <Title>{assetTitle}</Title>
          </div>
        ) : (
          <div>
            <div className="team-mining margin-bottom">
              {!participating && (
                // (miningPayload.character_avatar === undefined ||
                //   miningPayload.craft === undefined ||
                //   miningPayload.symbolics_Art === undefined ||
                //   miningPayload.land === undefined) &&
                <Title>Select your team to start mining..</Title>
              )}
            </div>
            <div className="team-mining margin-bottom">
              {miningPayload && miningPayload.character_avatar !== undefined && (
                <div className="selected-section">
                  <div className="sub-section">
                    <div className="select-title">Selected Character</div>
                    <div className="select-title white-color">
                      {miningPayload &&
                        miningPayload.character_avatar !== undefined &&
                        miningobj.character_avatar.name}
                    </div>
                    <div
                      className="back"
                      onClick={() => this.back("character_avatar")}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              )}
              {miningPayload && miningPayload.craft !== undefined && (
                <div className="selected-section">
                  <div className="sub-section">
                    <div className="select-title">Selected Craft</div>
                    <div className="select-title white-color">
                      {miningPayload &&
                        miningPayload.craft !== undefined &&
                        miningobj.craft.name}
                    </div>
                    <div className="back" onClick={() => this.back("craft")}>
                      Remove
                    </div>
                  </div>
                </div>
              )}
              {miningPayload && miningPayload.symbolics_Art !== undefined && (
                <div className="selected-section">
                  <div className="sub-section">
                    <div className="select-title">Selected Symbolic</div>
                    <div className="select-title white-font">
                      {miningPayload &&
                        miningPayload.symbolics_Art !== undefined &&
                        miningobj.symbolics_Art.name}
                    </div>
                    <div
                      className="back"
                      onClick={() => this.back("symbolics_Art")}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              )}
              {miningPayload && miningPayload.land !== undefined && (
                <div className="selected-section">
                  <div className="sub-section">
                    <div className="select-title">Selected Land</div>
                    <div className="select-title white-font">
                      {miningPayload &&
                        miningPayload.land !== undefined &&
                        miningobj.land.name}
                    </div>
                    <div className="back" onClick={() => this.back("land")}>
                      Remove
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!participating && (
              <div className="search-section">
                <div className="mining-search-section">
                  <Select
                    value={selectedValue}
                    placeholder={"Select Assets"}
                    handleChange={this.selectOption}
                    options={options}
                    border={`2px solid #8c14cf`}
                    color={`${variable.whiteColor}`}
                  />
                </div>
                {selectTable === "land" && (
                  <div className="mining-search-section">
                    <Select
                      value={selectShortValue}
                      placeholder={"Resource shorting"}
                      handleChange={this.selectshortOption}
                      options={shortingOptions}
                      border={`2px solid #8c14cf`}
                      color={`${variable.whiteColor}`}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="team-mining">
              <LeftSection>
                {participating && <Title>Start mining: {miningTime}</Title>}
                {participating && earn_capacity > 0 && (
                  <Title>Earn Capacity: {earn_capacity}</Title>
                )}

                {participating &&
                  miningTeamDetails &&
                  miningTeamDetails.length !== 0 && (
                    <React.Fragment>
                      <Mining>
                        <Title SubTitle={true}>Mining Team Details</Title>
                      </Mining>

                      <MiningDetail
                        miningTeamDetails={miningTeamDetails}
                        dataLoading={dataLoading}
                      />
                    </React.Fragment>
                  )}
                {owner_changed && <Title>Your mining team distroyed....</Title>}
                {assetLoading && <Loader />}

                {selectTable === "character_avatar" && !assetLoading && (
                  <Section>
                    <div>CharacterAssets</div>

                    {!selectAssets ? (
                      characterAssets && characterAssets.length !== 0 ? (
                        <AssetDetails
                          assets={characterAssets}
                          selectTable={"characterAssets"}
                          openAsset={this.openAsset}
                          checkImageExists={this.checkImageExists}
                        />
                      ) : (
                        !participating && (
                          <SpaceingDiv>
                            <SelectSection
                              onClick={() =>
                                history.push({
                                  pathname: "/search",
                                  state: "character_avatar",
                                  category: true,
                                })
                              }
                            >
                              <SubSection>
                                Character assets are not available click here
                                for show assets
                              </SubSection>
                            </SelectSection>
                          </SpaceingDiv>
                        )
                      )
                    ) : (
                      assetDetails &&
                      assetDetails.length !== 0 &&
                      assetDetails.map((obj, key) => {
                        return (
                          <MainSection
                            key={key}
                            onClick={(e) =>
                              this.startMining(e, obj, "characterAssets")
                            }
                            active={
                              miningPayload.character_avatar !== undefined &&
                              obj.assetId === miningPayload.character_avatar.id
                                ? true
                                : false
                            }
                          >
                            <SubSection>
                              <ImageDiv>
                                <img src={obj.image_url} alt="" />
                              </ImageDiv>
                              <Description>
                                {obj.name ? obj.name : "-"}
                              </Description>
                            </SubSection>
                          </MainSection>
                        );
                      })
                    )}
                  </Section>
                )}

                {selectTable === "craft" && !assetLoading && (
                  <Section>
                    <div>Craft</div>
                    {!selectCraft ? (
                      craft && craft.length !== 0 ? (
                        <AssetDetails
                          assets={craft}
                          selectTable={"craft"}
                          openAsset={this.openAsset}
                          checkImageExists={this.checkImageExists}
                        />
                      ) : (
                        !participating && (
                          <SpaceingDiv>
                            <SelectSection
                              onClick={() =>
                                history.push({
                                  pathname: "/search",
                                  state: "craft",
                                  category: true,
                                })
                              }
                            >
                              <SubSection>
                                Craft assets are not available click here for
                                show assets
                              </SubSection>
                            </SelectSection>
                          </SpaceingDiv>
                        )
                      )
                    ) : (
                      craftDetails &&
                      craftDetails.length !== 0 &&
                      craftDetails.map((obj, key) => {
                        return (
                          <MainSection
                            key={key}
                            onClick={(e) => this.startMining(e, obj, "craft")}
                            active={
                              miningPayload.craft !== undefined &&
                              obj.assetId === miningPayload.craft.id
                                ? true
                                : false
                            }
                          >
                            <SubSection>
                              <ImageDiv>
                                <img src={obj.image_url} alt="" />
                              </ImageDiv>
                              <Description>
                                {obj.name ? obj.name : "-"}
                              </Description>
                            </SubSection>
                          </MainSection>
                        );
                      })
                    )}
                  </Section>
                )}
                {selectTable === "art" && !assetLoading && (
                  <Section>
                    <div> Symbolics Art</div>
                    {!selectArt ? (
                      symbolics_Art && symbolics_Art.length !== 0 ? (
                        <AssetDetails
                          assets={symbolics_Art}
                          selectTable={"symbolics_Art"}
                          openAsset={this.openAsset}
                          checkImageExists={this.checkImageExists}
                        />
                      ) : (
                        !participating && (
                          <SpaceingDiv>
                            <SelectSection
                              onClick={() =>
                                history.push({
                                  pathname: "/search",
                                  state: "art",
                                  category: true,
                                })
                              }
                            >
                              <SubSection>
                                Symbolic assets are not available click here for
                                show assets
                              </SubSection>
                            </SelectSection>
                          </SpaceingDiv>
                        )
                      )
                    ) : (
                      artDetails &&
                      artDetails.length !== 0 &&
                      artDetails.map((obj, key) => {
                        return (
                          <MainSection
                            key={key}
                            onClick={(e) =>
                              this.startMining(e, obj, "symbolics_Art")
                            }
                            active={
                              miningPayload.symbolics_Art !== undefined &&
                              obj.assetId === miningPayload.symbolics_Art.id
                                ? true
                                : false
                            }
                          >
                            <SubSection>
                              <ImageDiv>
                                <img src={obj.image_url} alt="" />
                              </ImageDiv>
                              <Description>
                                {obj.name ? obj.name : "-"}
                              </Description>
                            </SubSection>
                          </MainSection>
                        );
                      })
                    )}
                  </Section>
                )}
                {selectTable === "land" && !assetLoading && (
                  <Section>
                    <div>Land</div>

                    {!selectLand ? (
                      land && land.length !== 0 ? (
                        <AssetDetails
                          assets={land}
                          selectTable={"land"}
                          openAsset={this.openAsset}
                          checkImageExists={this.checkImageExists}
                        />
                      ) : (
                        !participating && (
                          <SpaceingDiv>
                            <SelectSection
                              onClick={() =>
                                history.push({
                                  pathname: "/search",
                                  state: "land",
                                  category: true,
                                })
                              }
                            >
                              <SubSection>
                                Land assets are not available click here for
                                show assets
                              </SubSection>
                            </SelectSection>
                          </SpaceingDiv>
                        )
                      )
                    ) : resetPagination ? (
                      <Loaderspinner
                        // type="TailSpin"
                        type="ThreeDots"
                        color="#fff"
                        width="80"
                        height="80"
                      />
                    ) : (
                      landDetails &&
                      landDetails.length !== 0 && (
                        <React.Fragment>
                          {
                            // isLandLoading ? (
                            //   <div
                            //     style={{
                            //       height: "650px",
                            //       margin: "auto",
                            //       display: "flex",
                            //       textAlign: "center",
                            //       alignItems: "center",
                            //       justifyContent: "center",
                            //     }}
                            //   >
                            //     <Loaderspinner
                            //       type="ThreeDots"
                            //       color="#fff"
                            //       width="80"
                            //       height="80"
                            //     />
                            //   </div>
                            // ) :
                            // (
                            landDetails.map((obj, key) => {
                              return (
                                <MainSection
                                  key={key}
                                  onClick={(e) =>
                                    this.startMining(e, obj, "land")
                                  }
                                  active={
                                    miningPayload.land !== undefined &&
                                    obj.assetId === miningPayload.land.id
                                      ? true
                                      : false
                                  }
                                >
                                  <SubSection>
                                    <ImageDiv>
                                      {isLandLoading ? (
                                        <Loaderspinner
                                          type="TailSpin"
                                          color="#fff"
                                          width="80"
                                          height="80"
                                        />
                                      ) : (
                                        <img src={obj.image_url} alt="" />
                                      )}
                                    </ImageDiv>

                                    {isLandLoading ? (
                                      <Loaderspinner
                                        type="ThreeDots"
                                        color="#fff"
                                        width="40"
                                        height="40"
                                      />
                                    ) : (
                                      <Description textalignstart>
                                        {obj.name ? obj.name : "-"}
                                      </Description>
                                    )}

                                    {!isLandLoading && (
                                      <Description border>
                                        <b> Regeneration: </b>
                                        {obj.regeneration
                                          ? obj.regeneration
                                          : "-"}
                                      </Description>
                                    )}
                                    {!isLandLoading && (
                                      <Description border>
                                        <b> CGG_Resource: </b>
                                        {obj.CGG_Resource
                                          ? obj.CGG_Resource
                                          : "-"}
                                      </Description>
                                    )}
                                    {!isLandLoading && (
                                      <Description border>
                                        <b> No of miners: </b>
                                        {obj.miner_details
                                          ? obj.miner_details.length
                                          : "-"}
                                      </Description>
                                    )}
                                  </SubSection>
                                </MainSection>
                              );
                            })
                            // )
                          }
                          {next_page_url !== null && (
                            <ReactPagination
                              pageCount={12}
                              onPageChange={(e) => this.onPageChange(e)}
                              // resetPagination={resetPagination}
                            />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </Section>
                )}
              </LeftSection>
              <RightSection>
                {!participating &&
                  assetType.map((obj, key) => {
                    return (
                      <SpaceingDiv key={key}>
                        <SelectSection
                          active={selectTable === obj.type ? true : false}
                        >
                          <SubSection
                            onClick={() => this.selectTable(obj.type)}
                          >
                            <div>Select {obj.type}</div>
                          </SubSection>
                        </SelectSection>
                      </SpaceingDiv>
                    );
                  })}

                {miningPayload.character_avatar !== undefined &&
                  miningPayload.craft !== undefined &&
                  miningPayload.symbolics_Art !== undefined &&
                  miningPayload.land !== undefined && (
                    <SpaceingDiv>
                      <div>
                        <Button
                          theme="green"
                          onClick={(e) => this.ContinueMining(e)}
                        >
                          {isLoading ? (
                            <Loaderspinner
                              type="Oval"
                              color="#000"
                              width="18"
                              height="18"
                            />
                          ) : (
                            "Continue"
                          )}
                        </Button>
                      </div>
                    </SpaceingDiv>
                  )}
                {participating && (
                  <SpaceingDiv>
                    <div>
                      <Button theme="green" onClick={(e) => this.StopMining(e)}>
                        {isStopMining ? (
                          <Loaderspinner
                            type="Oval"
                            color="#000"
                            width="18"
                            height="18"
                          />
                        ) : (
                          "Stop Mining"
                        )}
                      </Button>
                    </div>
                  </SpaceingDiv>
                )}
              </RightSection>
            </div>
          </div>
        )}
      </Layout>
    );
  };
}
const Title = styled.div`
  margin-top: 22px;
  font-size: 30px;
  ${(props) =>
    props.SubTitle
      ? `
      color:#D375FF;
      font-size: 25px;
    `
      : null}
`;

const MiningSearch = styled.div`
  display: block;
  color: ${variable.whiteColor};
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
  ${media.tablet`
    display: flex;
    width: 30%;
  `}
`;
const Mining = styled.div`
  display: block;
  color: ${variable.whiteColor};
  width: 100%;
  ${media.tablet`
    display: flex;
  `}
`;
const ImageDiv = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftSection = styled.div`
  width: 100%;
  ${media.tablet`
    width: 70%;
  `}
`;
const RightSection = styled.div`
  width: 100%;
  ${media.tablet`
    width: 30%;
  `}
`;
const Description = styled.div`
  margin-top: 10px;
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    props.border
      ? `
      border-top: 2px solid #26bea7;
      padding-top: 5px;
      text-align: start;
    `
      : null}
  ${(props) =>
    props.textalignstart
      ? `
       text-align: start;
        `
      : null}
`;
const SubSection = styled.div`
  clip-path: polygon(0 0%, 95% 0, 100% 30px, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.6rem 1.6rem;
  cursor: pointer;
  text-align: center;
`;
const MainSection = styled.div`
  clip-path: polygon(0 0%, 95% 0, 100% 30px, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background-image: linear-gradient(136deg, #8c14cf 0%, #01c3c5 100%);
  padding: 0.2rem;
  display: inline-block;
  margin: 10px;
  ${(props) =>
    props.active
      ? `
      background-image: linear-gradient(to right,#00ffe6 0%,#00fffd 100%)
    `
      : null}
`;

const SelectSection = styled.div`
  clip-path: polygon(0 0%, 95% 0, 100% 30px, 100% 100%, 2% 100%, 0 100%, 0 0%);
  background-image: linear-gradient(136deg, #8c14cf 0%, #01c3c5 100%);
  padding: 0.2rem;
  ${(props) =>
    props.active
      ? `
      background-image: linear-gradient(to right,#00ffe6 0%,#00fffd 100%);
    `
      : null}
`;
const Section = styled.div``;
const SpaceingDiv = styled.div`
  margin: 10px;
  ${(props) =>
    props.margin
      ? `
      margin: 10px 0;
    `
      : null}
`;

export default withTranslation()(MiningContainer);
