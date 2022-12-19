<template>
  <div class="container-fluid">
    <!-- PwC logo -->
    <div class="row">
      <div class="col">
        <div style="margin-top:20px;" class="mb-2">
          <img src="./PwC.png" style="width: 100px;">
        </div>
        <!-- <button id="exportSettingBtn" style="width:80%;font-size:14px" @click="exportSetting">匯出當前設定</button> -->
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="row">
      <div class="col">
        <!-- 第一步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step1：請連結財產目錄 Excel 檔案：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <label for="exampleFormControlInput1" class="form-label"><b>
                <BIconFiles style="vertical-align:text-top;" class="icon" />該工具將依客戶所提供之財產目錄進行試算。
              </b></label>
            <button type="button" class="btn" style="padding:0px;" v-on:click="help_1 = !help_1">
              <span v-if="!help_1">
                <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
              </span>
              <span v-if="help_1">
                <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
              </span>
            </button>
            <br>
            <div v-if="help_1">
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>1.於折舊費用計算工具前連結一個 Input Data 元件，並設定 Input Data 相關資訊。</b></label>
                <img src="./step_1_1.png" style="width: 100%;max-width:650px;">
              </div>
            </div>
            <div class="mb-3">
              <b v-if="legder_status === true" style="color:green;">
                <BIconCheckLg style="vertical-align:text-top;" class="icon" /> 已連接完成
              </b>
              <b v-if="legder_status !== true" style="color:red;">
                <BIconExclamationTriangleFill style="vertical-align:text-top;" class="icon" /> {{ legder_status }}
              </b>
            </div>
          </div>
        </div>

        <!-- 第二步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step2：請選擇欲存放結果檔之資料夾路徑<br>(檔名為 PwC_折舊費用試算_YYYY-MM-DD hh-mm-ss.xlsx)</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <button type="button" class="btn" style="padding:0px;" v-on:click="help_2 = !help_2">
              <span v-if="!help_2">
                <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
              </span>
              <span v-if="help_2">
                <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
              </span>
            </button>
            <br>
            <div v-if="help_2">
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>選擇試算結果存放資料夾，儲存檔名系統會自動命名為 PwC_折舊費用試算_YYYY-MM-DD hh-mm-ss.xlsx</b></label>
                <img src="./step_2_1.png" style="width: 100%;max-width:650px;">
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconFiles style="vertical-align:text-top;" class="icon" />請選擇資料夾：
                </b></label>
              <ayx data-ui-props='{type:"FileBrowse", widgetId:"save_dir", browseType:"Folder"}'></ayx>
            </div>
          </div>
        </div>

        <!-- 第三步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step3：請選擇設定檔，若無設定檔則可不填。</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <button type="button" class="btn" style="padding:0px;" v-on:click="help_3 = !help_3">
              <span v-if="!help_3">
                <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
              </span>
              <span v-if="help_3">
                <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
              </span>
            </button>
            <br>
            <div v-if="help_3">
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>設定檔說明：該工具成功執行完成後，將自動儲存該次設定，儲存於目標資料夾下，檔名為 PwC_折舊費用設定檔_YYYY-MM-DD
                    hh-mm.csv，可於下一次執行時匯入</b></label>
              </div>
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>選擇設定檔 csv 檔</b></label>
                <img src="./step_3_1.png" style="width: 100%;max-width:650px;">
              </div>
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>系統將根據該設定檔自動完成 step4 ~ step6 的欄位填寫。</b></label>
              </div>
            </div>
            <div style="width:80%;font-size:14px" class="mb-2">
              <label :class="['btn', 'btn-sm', input_isConnectFile ? 'importBtnAccessColor' : 'importBtnLockColor']">
                <BIconBoxArrowInDown class="icon" /> 匯入設定檔(.csv檔)
                <input type="file" style="display:none;" accept=".csv" @change="onFileChange"
                  :disabled="!input_isConnectFile">
              </label>
            </div>
          </div>
        </div>

        <!-- 第四步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center"><b>Step4：請選擇季度：</b></div>
          <div class="card-body" style="overflow-x:auto;">
            <select class="form-control" v-model="quarter_month">
              <option disabled value="">季度選項</option>
              <option v-for="item, index in quarter_month_list" v-bind:key="index" :value=item.value>{{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- 第五步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center"><b>Step5：請輸入其對應欄位：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <button type="button" class="btn" style="padding:0px;" v-on:click="help_4 = !help_4">
              <span v-if="!help_4">
                <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
              </span>
              <span v-if="help_4">
                <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
              </span>
            </button>
            <br>
            <div v-if="help_4">
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>請選擇必要欄位Mapping，<br>其中，固定資產成本之值若為其他欄位計算而來，請先自行於Excel
                    中新增欄位計算好，在進行欄位對應。</b></label>
                <img src="./step_4_1.png" style="width: 100%;max-width:650px;">
              </div>
            </div>
            <!-- 固定資產成本 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 固定資產成本
                </b></label><br>
              <select class="form-control" v-model="asset_cost_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>
            <hr style="border:1px dashed" />

            <!-- 耐用年限(折舊率) -->
            <div class="mb-3">
              <label for="exampleFormControlInput3" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 耐用年限(折舊率)
                </b></label><br>
              <select class="form-control mb-2" v-model="durable_period_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
              <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" v-model="is_durable_period_year" />
                <label for="exampleFormControlInput3" class="form-check-label"><b>
                    耐用年限單位是否為年份(若否則為月份)
                  </b></label>
              </div>
            </div>

            <hr style="border:1px dashed #000" />

            <!-- 預留殘值 -->
            <div class="mb-3">
              <label for="exampleFormControlInput2" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 預留殘值
                </b></label><br>
              <button type="button" class="btn" style="padding:0px;" v-on:click="help_5 = !help_5">
                <span v-if="!help_5">
                  <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
                </span>
                <span v-if="help_5">
                  <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
                </span>
              </button>
              <br>
              <div v-if="help_5">
                <div class="mb-3" style="display:grid;justify-content:space-around;">
                  <label class="form-label"><b>若無預留殘值，則勾選不適用即可。</b></label>
                  <img src="./step_4_2.png" style="width: 100%;max-width:650px;">
                </div>
              </div>
              <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" v-model="is_res_val_empty" />
                <label for="exampleFormControlInput2" class="form-check-label mb-2"><b>
                    不適用 (勾選以試算所有資料)
                  </b></label>
              </div>
              <div v-if="is_res_val_empty.toString() == 'false'">
                <select class="form-control" v-model="reserved_residual_values_col">
                  <option disabled value="">選擇欄位</option>
                  <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
                </select>
              </div>
            </div>

            <hr style="border:1px dashed #000" />

            <!-- 折舊起始日期 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 折舊起始日期<br>(請使用西元日期表示法 : 如 2022/11/02)
                </b></label><br>
              <select class="form-control" v-model="dep_start_date_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
              <br>
              <div><label for="exampleFormControlInput1" class="form-label">
                  請選擇折舊月份計算方式：
                </label></div>
              <div>
                <button type="button" class="btn" style="padding:0px;" v-on:click="help_6 = !help_6">
                  <span v-if="!help_6">
                    <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
                  </span>
                  <span v-if="help_6">
                    <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
                  </span>
                </button>
              </div>
              <div v-if="help_6">
                <div class="mb-2" style="display:grid;justify-content:space-around;">
                  <label class="form-label"><b>其中，15天為期 (以當月15號為基準)，15 號以後購入者折舊費用自次月起算 : </b></label>
                  <label class="form-label"><b>方法一：15號以前購入者，當月折舊費用為 0.5 個月；</b></label>
                  <label class="form-label"><b>方法二：15號以前購入者，折舊費用自當月起算；</b></label>
                </div>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way1" value='1'
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio1">下個月計算</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way2" value='2'
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio2">15 天為期(方法一)</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way2" value='3'
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio2">15 天為期(方法二)</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way3" value='4'
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio2">購入月份計算</label>
              </div>
            </div>

            <hr style="border:1px dashed #000" />

            <!-- 本期提列數 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 本期提列數
                </b></label>
              <br>
              <select class="form-control" v-model="amount_of_this_period_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- 第六步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step6：請選擇欲排除之資產編號<br>(工具對於這些資產將不進行試算)</b>
          </div>

          <div class="card-body" style="overflow-x:auto;">
            <button type="button" class="btn" style="padding:0px;" v-on:click="(help_7 = !help_7)">
              <span v-if="!help_7">
                <BIconEyeFill style="vertical-align:text-top;" class="icon" /> 檢視教學
              </span>
              <span v-if="help_7">
                <BIconEyeSlashFill style="vertical-align:text-top;" class="icon" /> 隱藏教學
              </span>
            </button>
            <br>
            <div v-if="help_7">
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>依資產名稱或編號進行篩選，並選擇其對應欄位。</b></label>
                <img src="./step_5_1.png" style="width: 100%;max-width:650px;">
              </div>
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>設定篩選條件，條件若輸入 "1611;1616" 則表示 1611 和 1616 開頭的資產編號將不會進行折舊試算。</b></label>
                <img src="./step_5_2.png" style="width: 100%;max-width:650px;">
              </div>
              <div class="mb-3" style="display:grid;justify-content:space-around;">
                <label class="form-label"><b>若無需排除資產編號，選擇 "無須排除" 即可。</b></label>
                <img src="./step_5_3.png" style="width: 100%;max-width:650px;">
              </div>
            </div>
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input" v-model="is_no_need_asset_filter" />
              <label for="exampleFormControlInput1" class="form-check-label mb-2"><b>
                  無須排除
                </b></label>
            </div>
            <div class="mb-3" v-if="is_no_need_asset_filter.toString() == 'false'">
              <div class="mb-2">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineDepDetermineRadioOptions"
                    id="dep_determine_way1" :value=true v-model="is_determine_num">
                  <label class="form-check-label" for="inlineRadio1">按資產編號進行排除</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineDepDetermineRadioOptions"
                    id="dep_determine_way2" :value=false v-model="is_determine_num">
                  <label class="form-check-label" for="inlineRadio2">按資產名稱進行排除</label>
                </div>
              </div>
              <div v-if="is_determine_num.toString() == 'true'">
                <!-- 資產編號 -->
                <label for="exampleFormControlInput1" class="form-label"><b>
                    <BIconColumns style="vertical-align:text-top;" class="icon" /> 資產編號
                  </b></label>
                <br>
                <select class="form-control mb-2" v-model="assets_num_col">
                  <option disabled value="">選擇欄位</option>
                  <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
                </select>
                <label for="exampleFormControlInput1" class="form-check-label mb-2"><b>
                    {{ is_determine_num.toString() == 'true' ? "請輸入不計入折舊費用計算的資產編號抬頭代表號：" : "請輸入不計入折舊費用計算的資產名稱：" }}<br>(
                    若需排除多筆資料，可使用分號分隔 )
                  </b></label>
                <input type="text" id="determine_num1" class="form-control"
                  :placeholder="is_determine_num.toString() == 'true' ? '請輸入資產編號' : '請輸入資產名稱'" v-model="no_cal_keyword">
              </div>
              <div class="mb-3" v-if="is_determine_num.toString() == 'false'">
                <!-- 資產名稱 -->
                <label for="exampleFormControlInput1" class="form-label"><b>
                    <BIconColumns style="vertical-align:text-top;" class="icon" /> 資產名稱
                  </b></label>
                <br>
                <select class="form-control mb-2" v-model="assets_name_col">
                  <option disabled value="">選擇欄位</option>
                  <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
                </select>
                <label for="exampleFormControlInput1" class="form-check-label"><b>
                    {{ is_determine_num.toString() == 'true' ? "請輸入不計入折舊費用計算的資產編號抬頭代表號：" : "請輸入不計入折舊費用計算的資產名稱：" }}<br>(
                    若需排除多筆資料，可使用分號分隔 )
                  </b></label>
                <input type="text" id="determine_num1" class="form-control"
                  :placeholder="is_determine_num.toString() == 'true' ? '請輸入資產編號' : '請輸入資產名稱'" v-model="no_cal_keyword">
              </div>
            </div>
          </div>
        </div>

        <!-- 測試用 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>測試年份<br>(非必填，若需試算過往年度的財產目錄，可填寫此欄位)</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <el-date-picker v-model="testYear" type="year" placeholder="選擇年份" value-format="YYYY">
            <!-- <template>
              <div class="cell" :class="{ current: cell.isCurrent }">
                <span class="text">{{ cell.text }}</span>
                <span v-if="isHoliday(cell)" class="holiday" />
              </div>
            </template> -->
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer mt-auto">
    <p class="text-muted" style="margin: 0px;text-align: center;">版本：0.5.5</p>
  <br>
  </footer>

</template>
<script>
//replaceAll Polyfill
import moment from 'moment';
/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {

    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }

    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);

  };
}

//Clean Punctuation
String.prototype.clsPunc = function () {
  return this.replace(/[\p{P}\p{S}\p{Z}]/gu, '').toLowerCase()
}
export default {
  name: 'files',
  data() {
    return {
      // 寫入 Altreyx 參數
      assets_num_col: "", // 資產分類編號
      assets_name_col: "", // 資產分類名稱
      asset_cost_col: "", // 固定資產成本
      durable_period_col: "", // 耐用年限
      is_durable_period_year: "", //耐用年限是否為年份
      reserved_residual_values_col: "", // 預留殘值
      dep_start_date_col: "", // 折舊起始日期
      amount_of_this_period_col: "", // 本期提列數
      no_cal_keyword: "", // 欲排除之會科關鍵字
      dep_trial_way: "", // 折舊起算方式, 0=>15天為期, 1=>下個月計算, 3=>購入月份計算
      input_isConnectFile: "",
      is_determine_num: "", // 是否依會科判斷
      save_dir: "", // 儲存路徑
      is_no_need_asset_filter: "", // 不需排除會科
      is_res_val_empty: "", // 無預留殘值
      quarter_month: "", // 季度選項

      // 畫面控制相關參數
      quarter_month_list: [{ name: "Q1", value: 3 }, { name: "Q2", value: 6 }, { name: "Q3", value: 9 }, { name: "Q4", value: 12 }],
      str_columns: [],
      val_columns: [],
      columns: [],
      setting_info: "",
      fuckword:"",
      isRight:false,
      help_1: false,
      help_2: false,
      help_3: false,
      help_4: false,
      help_5: false,
      help_6: false,
      help_7: false,

      // 測試用
      testYear: "",
    }
  },
  components: {
  },
  watch: {
    save_dir: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("save_dir").setValue(val)
        }
      },
      deep: true
    },
    assets_num_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("assets_num_col").setValue(val)
        }
      },
      deep: true
    },
    assets_name_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("assets_name_col").setValue(val)
        }
      },
      deep: true
    },
    asset_cost_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("asset_cost_col").setValue(val)
        }
      },
      deep: true
    },
    durable_period_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("durable_period_col").setValue(val)
        }
      },
      deep: true
    },
    is_durable_period_year: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_durable_period_year").setValue(val)
        }
      },
      deep: true
    },
    reserved_residual_values_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("reserved_residual_values_col").setValue(val)
        }
      },
      deep: true
    },
    dep_start_date_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("dep_start_date_col").setValue(val)
        }
      },
      deep: true
    },
    amount_of_this_period_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("amount_of_this_period_col").setValue(val)
        }
      },
      deep: true
    },
    no_cal_keyword: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("no_cal_keyword").setValue(val)
        }
      },
      deep: true
    },
    is_determine_num: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_determine_num").setValue(val)
        }
      },
      deep: true
    },
    length: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("length").setValue(val)
        }
      },
      deep: true
    },
    dep_trial_way: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("dep_trial_way").setValue(val)
        }
      },
      deep: true
    },
    is_no_need_asset_filter: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_no_need_asset_filter").setValue(val)
        }
      },
      deep: true
    },
    is_res_val_empty: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_res_val_empty").setValue(val)
        }
      },
      deep: true
    },
    quarter_month: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("quarter_month").setValue(val)
        }
      },
      deep: true
    },
    testYear: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("testYear").setValue(val)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (typeof window.Alteryx !== 'undefined') {
      //Load Alteryx Library
      document.write('<link rel="import" href="' + window.Alteryx.LibDir + '2/lib/includes.html">');
      let libpath = window.Alteryx.LibDir + "2/lib/build/designerDesktop.bundle.js"
      let script = document.createElement('script')
      script.setAttribute('src', libpath)
      //Script Onload Callback
      script.onload = function () {
        //Define DataItem
        window.Alteryx.Gui.BeforeLoad = function (manager, AlteryxDataItems) {
          var assets_num_col = new AlteryxDataItems.SimpleString('assets_num_col')
          manager.addDataItem(assets_num_col)
          var assets_name_col = new AlteryxDataItems.SimpleString('assets_name_col')
          manager.addDataItem(assets_name_col)
          var asset_cost_col = new AlteryxDataItems.SimpleString('asset_cost_col')
          manager.addDataItem(asset_cost_col)
          var durable_period_col = new AlteryxDataItems.SimpleString('durable_period_col')
          manager.addDataItem(durable_period_col)
          var reserved_residual_values_col = new AlteryxDataItems.SimpleString('reserved_residual_values_col')
          manager.addDataItem(reserved_residual_values_col)
          var dep_start_date_col = new AlteryxDataItems.SimpleString('dep_start_date_col')
          manager.addDataItem(dep_start_date_col)
          var amount_of_this_period_col = new AlteryxDataItems.SimpleString('amount_of_this_period_col')
          manager.addDataItem(amount_of_this_period_col)
          var is_durable_period_year = new AlteryxDataItems.SimpleString('is_durable_period_year')
          manager.addDataItem(is_durable_period_year)
          var no_cal_keyword = new AlteryxDataItems.SimpleString('no_cal_keyword')
          manager.addDataItem(no_cal_keyword)
          var is_determine_num = new AlteryxDataItems.SimpleString('is_determine_num')
          manager.addDataItem(is_determine_num)
          var dep_trial_way = new AlteryxDataItems.SimpleString('dep_trial_way')
          manager.addDataItem(dep_trial_way)
          var save_dir = new AlteryxDataItems.SimpleString('save_dir')
          manager.addDataItem(save_dir)
          manager.bindDataItemToWidget(save_dir, 'save_dir')
          var is_no_need_asset_filter = new AlteryxDataItems.SimpleString('is_no_need_asset_filter')
          manager.addDataItem(is_no_need_asset_filter)
          var is_res_val_empty = new AlteryxDataItems.SimpleString('is_res_val_empty')
          manager.addDataItem(is_res_val_empty)
          var quarter_month = new AlteryxDataItems.SimpleString('quarter_month')
          manager.addDataItem(quarter_month)
          var testYear = new AlteryxDataItems.SimpleString('testYear')
          manager.addDataItem(testYear)
        }
        //Load Settings
        window.Alteryx.Gui.AfterLoad = function (manager) {
          //Set WorkflowDirectory
          this.assets_num_col = manager.getDataItem("assets_num_col").getValue()
          this.assets_name_col = manager.getDataItem("assets_name_col").getValue()
          this.asset_cost_col = manager.getDataItem("asset_cost_col").getValue()
          this.durable_period_col = manager.getDataItem("durable_period_col").getValue()
          this.reserved_residual_values_col = manager.getDataItem("reserved_residual_values_col").getValue()
          this.dep_start_date_col = manager.getDataItem("dep_start_date_col").getValue()
          this.amount_of_this_period_col = manager.getDataItem("amount_of_this_period_col").getValue()
          this.is_durable_period_year = manager.getDataItem("is_durable_period_year").getValue()
          this.dep_trial_way = manager.getDataItem("dep_trial_way").getValue()
          this.no_cal_keyword = manager.getDataItem("no_cal_keyword").getValue()
          this.is_determine_num = manager.getDataItem("is_determine_num").getValue()
          this.save_dir = manager.getDataItem("save_dir").getValue()
          this.is_res_val_empty = manager.getDataItem("is_res_val_empty").getValue()
          this.is_no_need_asset_filter = manager.getDataItem("is_no_need_asset_filter").getValue()
          this.quarter_month = manager.getDataItem("quarter_month").getValue()
          this.testYear = manager.getDataItem("testYear").getValue()

          if (this.is_no_need_asset_filter === "") {
            this.is_no_need_asset_filter = false
          }
          if (this.is_res_val_empty === "") {
            this.is_res_val_empty = false
          }
          if (this.is_determine_num === "") {
            this.is_determine_num = true
          }
          if (this.is_durable_period_year === "") {
            this.is_durable_period_year = true
          }
          if (this.dep_trial_way === "") {
            this.dep_trial_way = '2'
          }
          // Load Income Field
          let str_type = ["String", "WString", "V_String", "V_WString", "Date", "Time", "DateTime"]
          let val_type = ["Byte", "Int16", "Int32", "Int64", "FixedDecimal", "Float", "Double"]
          let incomingFields = manager.getIncomingFields()
          this.str_columns = incomingFields.filter(item => str_type.indexOf(item.strType) > -1).map(item => item.strName.replaceAll(String.fromCharCode(10), "").replaceAll(" ","").replaceAll("　",""))
          this.val_columns = incomingFields.filter(item => val_type.indexOf(item.strType) > -1).map(item => item.strName.replaceAll(String.fromCharCode(10), "").replaceAll(" ","").replaceAll("　",""))
          this.columns = this.str_columns.concat(this.val_columns)

          if ((this.str_columns.length + this.val_columns.length) === 0) {
            this.input_isConnectFile = false;
          }
          else {
            this.input_isConnectFile = true;
          }
        }.bind(this)
      }.bind(this)
      //Load Script
      document.head.appendChild(script)
    }
  },
  computed: {
    legder_status: function () {
      try {
        //是否連接資料
        if ((this.str_columns.length + this.val_columns.length) === 0) {
          throw `尚未連結檔案或檔案無資料`
        }
        return true
      } catch (err) {
        return err
      }
    }
  },
  methods: {
    onFileChange: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.importSetting(files[0]);
      e.target.value = null
    },
    importSetting: function (file) {
      let reader = new FileReader();
      let setting_info = ""
      reader.onload = function (e) {
        //解析CSV
        let data = this.$papa.parse(e.target.result, { header: true })
        setting_info = data.data[0]
        this.setting_info = setting_info
        if (setting_info != "") {
          if (this.columns.includes(setting_info["資產分類編號"])) {
            this.assets_num_col = setting_info["資產分類編號"];
          }
          else {
            this.assets_name_col = ""
          }

          if (this.columns.includes(setting_info["資產分類名稱"])) {
            this.assets_name_col = setting_info["資產分類名稱"];
          }
          else {
            this.assets_name_col = ""
          }

          if (this.columns.includes(setting_info["固定資產成本"])) {
            this.asset_cost_col = setting_info["固定資產成本"];
          }
          else {
            this.asset_cost_col = ""
          }

          if (this.columns.includes(setting_info["耐用年限"])) {
            this.durable_period_col = setting_info["耐用年限"];
          }
          else {
            this.durable_period_col = ""
          }

          if (this.columns.includes(setting_info["預留殘值"])) {
            this.reserved_residual_values_col = setting_info["預留殘值"];
          }
          else {
            this.reserved_residual_values_col = ""
          }

          if (this.columns.includes(setting_info["折舊起始日期"])) {
            this.dep_start_date_col = setting_info["折舊起始日期"];
          }
          else {
            this.dep_start_date_col = ""
          }

          if (this.columns.includes(setting_info["本期提列數"])) {
            this.amount_of_this_period_col = setting_info["本期提列數"];
          }
          else {
            this.amount_of_this_period_col = ""
          }
          this.is_durable_period_year = setting_info["耐用年限是否為年份"].toLowerCase() == "true" ? true : false;
          this.dep_trial_way = setting_info["折舊起算方式"];
          this.is_determine_num = setting_info["排除時是否依產編號篩選"].toLowerCase() == "true" ? true : false;
          this.no_cal_keyword = setting_info["欲排除之會科關鍵字"];
          this.is_no_need_asset_filter = setting_info["不需排除會科"].toLowerCase() == "true" ? true : false;
          this.is_res_val_empty = setting_info["無預留殘值"].toLowerCase() == "true" ? true : false;
          this.quarter_month = setting_info["季度"];
          this.testYear = setting_info["測試年份"];
        }
      }.bind(this)
      reader.readAsText(file, "big5");

    },
    exportSetting: function () {
      var data = {
        assets_num_col: this.assets_num_col,
        assets_name_col: this.assets_name_col,
        asset_cost_col: this.asset_cost_col,
        durable_period_col: this.durable_period_col,
        is_durable_period_year: this.is_durable_period_year,
        reserved_residual_values_col: this.reserved_residual_values_col,
        dep_start_date_col: this.dep_start_date_col,
        amount_of_this_period_col: this.amount_of_this_period_col,
        no_cal_keyword: this.no_cal_keyword,
        dep_trial_way: this.dep_trial_way,
        is_determine_num: this.is_determine_num,
        save_dir: this.save_dir,
        is_no_need_asset_filter: this.is_no_need_asset_filter,
        is_res_val_empty: this.is_res_val_empty,
        quarter_month: this.quarter_month,
      }
      const csv = this.$papa.unparse([
        data]
      );
      const blob = new Blob([csv]);
      const a = document.getElementById('downloadTag');
      a.href = URL.createObjectURL(blob, { type: 'text/plain' });
      var currDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      a.download = "折舊試算設定檔_" + currDate + ".csv";
      a.target = '_blank';
      a.click();
    }
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft JhengHei", "PingFang TC", "Heiti TC", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}

html,
body {
  height: 100%;
}

.importBtnAccessColor {
  color: #464646;
  background-color: #FFB600;
}

.importBtnLockColor {
  color: #464646;
  background-color: #DEDEDE;
}
</style>
