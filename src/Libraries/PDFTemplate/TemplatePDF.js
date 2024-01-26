<div
    style="
      min-width: 360px !important;
      max-width: 600px !important;
      margin: 0 auto !important;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: left;
      background-color: #fff;
    "
  >
    <div
      class="mainContainer"
      style="
        box-sizing: border-box;
        min-width: 360px;
        max-width: 600px;
        margin: 0 auto;
      "
    >
      <div
        class="header"
        style="box-sizing: border-box; width: 100%; height: fit-content"
      >
        <img
          src="<%= headerImg %>"
          class="headerImg"
          style="
            box-sizing: border-box;
            vertical-align: middle;
            border-style: none;
            page-break-inside: avoid;
            width: 100%;
          "
        />
      </div>
      <div
        class="container-sm pl-4 pr-4 pt-3 pb-3"
        style="
          box-sizing: border-box;
          width: 100%;
          padding-right: 1.5rem !important;
          padding-left: 1.5rem !important;
          margin-right: auto;
          margin-left: auto;
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        "
      >
        <div
          class="row"
          style="
            box-sizing: border-box;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          "
        >
          <div
            class="col text-center orange m-2"
            style="
              box-sizing: border-box;
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
              overflow-wrap: break-word;
              color: orange;
              margin: 0.5rem !important;
              text-align: center !important;
            "
          >
            <h4
              style="
                box-sizing: border-box;
                margin-top: 0;
                margin-bottom: 0.5rem;
                font-weight: 500;
                line-height: 1.2;
                font-size: 1.5rem;
              "
            >
              Terimakasih Telah Berbelanja Di Toko Kami
            </h4>
          </div>
        </div>
        <div
          class="row"
          style="
            box-sizing: border-box;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          "
        >
          <div
            class="col-6 text-left"
            style="
              box-sizing: border-box;
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
              text-align: left !important;
            "
          >
            <div style="box-sizing: border-box">Transaction ID:</div>
            <div
              class="orange"
              style="
                box-sizing: border-box;
                overflow-wrap: break-word;
                color: orange;
              "
            >
              <%= data.transactionId %>
            </div>
          </div>
          <div
            class="col-6 text-right"
            style="
              box-sizing: border-box;
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
              text-align: right !important;
            "
          >
            <div style="box-sizing: border-box">Time and Date:</div>
            <div
              class="orange"
              style="
                box-sizing: border-box;
                overflow-wrap: break-word;
                color: orange;
              "
            >
              <%= data.timeDate %>
            </div>
          </div>
        </div>
        <div
          class="row"
          style="
            box-sizing: border-box;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          "
        >
          <div
            class="col-6 text-left"
            style="
              box-sizing: border-box;
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
              text-align: left !important;
            "
          >
            <div style="box-sizing: border-box">Receipt Number:</div>
            <div
              class="orange"
              style="
                box-sizing: border-box;
                overflow-wrap: break-word;
                color: orange;
              "
            >
              <%= data.receiptNumber %>
            </div>
          </div>
          <div
            class="col-6 text-right"
            style="
              box-sizing: border-box;
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
              text-align: right !important;
            "
          >
            <div style="box-sizing: border-box">Payment Type:</div>
            <div
              class="orange"
              style="
                box-sizing: border-box;
                overflow-wrap: break-word;
                color: orange;
              "
            >
              <%= data.paymentType %>
            </div>
          </div>
        </div>
        <div
          class="row mt-3"
          style="
            box-sizing: border-box;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
            margin-top: 1rem !important;
          "
        >
          <h3
            class="w-100 text-center font-weight-bold"
            style="
              box-sizing: border-box;
              margin-top: 0;
              margin-bottom: 0.5rem;
              font-weight: 700 !important;
              line-height: 1.2;
              font-size: 1.75rem;
              orphans: 3;
              widows: 3;
              page-break-after: avoid;
              width: 100% !important;
              text-align: center !important;
            "
          >
            Total Pembayaran
          </h3>
          <h2
            class="w-100 text-center orange"
            style="
              box-sizing: border-box;
              margin-top: 0;
              margin-bottom: 0.5rem;
              font-weight: 500;
              line-height: 1.2;
              font-size: 2rem;
              orphans: 3;
              widows: 3;
              page-break-after: avoid;
              overflow-wrap: break-word;
              color: orange;
              width: 100% !important;
              text-align: center !important;
            "
          >
            <%= data.total %>
          </h2>
        </div>
      </div>
      <div
        class="container-sm bg-light p-3"
        style="
          box-sizing: border-box;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
          background-color: #f8f9fa !important;
          padding: 1rem !important;
        "
      >
        <h4
          class="orange"
          style="
            box-sizing: border-box;
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-weight: 500;
            line-height: 1.2;
            font-size: 1.5rem;
            overflow-wrap: break-word;
            color: orange;
          "
        >
          Detail Pemesanan
        </h4>
        <div
          class="bg-white p-2"
          style="
            height: 100%;
            box-sizing: border-box;
            background-color: #fff !important;
            padding: 0.5rem !important;
          "
        >
          <div
            class="row"
            style="
              box-sizing: border-box;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              margin-right: -15px;
              margin-left: -15px;
            "
          >
            <div
              class="col-6 w-75 font-weight-bold"
              style="
                box-sizing: border-box;
                position: relative;
                width: 75% !important;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
                font-weight: 700 !important;
              "
            >
              Detail Produk
            </div>
            <div
              class="col-6 w-25 font-weight-bold text-right"
              style="
                box-sizing: border-box;
                position: relative;
                width: 25% !important;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
                text-align: right !important;
                font-weight: 700 !important;
              "
            >
              Jumlah
            </div>
          </div>
          <hr
            style="
              box-sizing: content-box;
              height: 0;
              overflow: visible;
              margin-top: 1rem;
              margin-bottom: 1rem;
              border: 0;
              border-top: 1px solid rgba(0, 0, 0, 0.1);
            "
          />
          <ul
            class="m-0 p-0"
            style="
              list-style: none;
              box-sizing: border-box;
              margin-top: 0;
              margin-bottom: 1rem;
              margin: 0 !important;
              padding: 0 !important;
            "
          >
            <% if (data.transactionItems.length) {
            data.transactionItems.forEach(item => { %>
            <li style="box-sizing: border-box">
              <div
                class="row"
                style="
                  box-sizing: border-box;
                  display: flex;
                  -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
                  margin-right: -15px;
                  margin-left: -15px;
                "
              >
                <div
                  class="col-4"
                  style="
                    box-sizing: border-box;
                    position: relative;
                    width: 100%;
                    padding-right: 15px;
                    padding-left: 15px;
                    -ms-flex: 0 0 33.333333%;
                    flex: 0 0 33.333333%;
                    max-width: 33.333333%;
                  "
                >
                  <div style="box-sizing: border-box">
                    <%= item.productName %>
                  </div>
                  <div
                    class="pl-1 text-secondary"
                    style="
                      box-sizing: border-box;
                      padding-left: 0.25rem !important;
                      color: #6c757d !important;
                    "
                  >
                    <small
                      style="
                        box-sizing: border-box;
                        font-size: 80%;
                        font-weight: 400;
                      "
                    >
                      <ul
                        class="toppingList"
                        style="
                          box-sizing: border-box;
                          margin-top: 0;
                          margin-bottom: 0;
                          list-style: none;
                          padding: 0;
                          margin: 0;
                        "
                      >
                        <li style="box-sizing: border-box">
                          <% item.addOn.forEach(item => { %> <%= item %> <% });
                          %>
                        </li>
                      </ul>
                    </small>
                  </div>
                </div>
                <div
                  class="col-4 text-center"
                  style="
                    box-sizing: border-box;
                    position: relative;
                    width: 100%;
                    padding-right: 15px;
                    padding-left: 15px;
                    -ms-flex: 0 0 33.333333%;
                    flex: 0 0 33.333333%;
                    max-width: 33.333333%;
                    text-align: center !important;
                  "
                >
                  x<%=item.qty%>
                </div>
                <div
                  class="col-4 text-right mt-auto"
                  style="
                    box-sizing: border-box;
                    position: relative;
                    width: 100%;
                    padding-right: 15px;
                    padding-left: 15px;
                    -ms-flex: 0 0 33.333333%;
                    flex: 0 0 33.333333%;
                    max-width: 33.333333%;
                    margin-top: auto !important;
                    text-align: right !important;
                  "
                >
                  <%= item.price %>
                </div>
              </div>
            </li>

            <%}); %> <% } %>
          </ul>
          <ul
            class="m-0 mt-4 p-0"
            style="
              list-style: none;
              box-sizing: border-box;
              margin-top: 1.5rem !important;
              margin-bottom: 1rem;
              margin: 0 !important;
              padding: 0 !important;
            "
          >
            <% data.taxes.forEach(element => { %>
            <li style="box-sizing: border-box">
              <small
                style="box-sizing: border-box; font-size: 80%; font-weight: 400"
              >
                <div
                  class="row text-secondary"
                  style="
                    box-sizing: border-box;
                    display: flex;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    margin-right: -15px;
                    margin-left: -15px;
                    color: #6c757d !important;
                  "
                >
                  <div
                    class="col-6"
                    style="
                      box-sizing: border-box;
                      position: relative;
                      width: 100%;
                      padding-right: 15px;
                      padding-left: 15px;
                      -ms-flex: 0 0 50%;
                      flex: 0 0 50%;
                      max-width: 50%;
                    "
                  >
                    <div
                      class="pl-1"
                      style="
                        box-sizing: border-box;
                        padding-left: 0.25rem !important;
                      "
                    >
                      <%= element.name %> (<%= element.percentage %>%)
                    </div>
                  </div>
                  <div
                    class="col-6 text-right mt-auto"
                    style="
                      box-sizing: border-box;
                      position: relative;
                      width: 100%;
                      padding-right: 15px;
                      padding-left: 15px;
                      -ms-flex: 0 0 50%;
                      flex: 0 0 50%;
                      max-width: 50%;
                      margin-top: auto !important;
                      text-align: right !important;
                    "
                  >
                    <%= element.amount%>
                  </div>
                </div>
              </small>
            </li>
            <% }); %>
          </ul>
          <hr
            style="
              box-sizing: content-box;
              height: 0;
              overflow: visible;
              margin-top: 1rem;
              margin-bottom: 1rem;
              border: 0;
              border-top: 1px solid rgba(0, 0, 0, 0.1);
            "
          />
          <div
            class="row"
            style="
              box-sizing: border-box;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              margin-right: -15px;
              margin-left: -15px;
            "
          >
            <div
              class="col-6"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
              "
            >
              Sub Total
            </div>
            <div
              class="col-6 text-right"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
                text-align: right !important;
              "
            >
              <%= data.total %>
            </div>
          </div>
        </div>

        <h4
          class="orange mt-3"
          style="
            box-sizing: border-box;
            margin-top: 1rem !important;
            margin-bottom: 0.5rem;
            font-weight: 500;
            line-height: 1.2;
            font-size: 1.5rem;
            overflow-wrap: break-word;
            color: orange;
          "
        >
          Detail Anda
        </h4>
        <div
          class="bg-white p-2"
          style="
            box-sizing: border-box;
            background-color: #fff !important;
            padding: 0.5rem !important;
          "
        >
          <div
            class="row p-2"
            style="
              box-sizing: border-box;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              margin-right: -15px;
              margin-left: -15px;
              padding: 0.5rem !important;
            "
          >
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            >
              <div style="box-sizing: border-box">Nama:</div>
              <div
                class="orange"
                style="
                  box-sizing: border-box;
                  overflow-wrap: break-word;
                  color: orange;
                "
              >
                <%=data.customerDetails.name%>
              </div>
            </div>
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            >
              <div style="box-sizing: border-box">Nomor Telepon:</div>
              <div
                class="orange"
                style="
                  box-sizing: border-box;
                  overflow-wrap: break-word;
                  color: orange;
                "
              >
                <%=data.customerDetails.phone%>
              </div>
            </div>
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            >
              <div style="box-sizing: border-box">E-mail:</div>
              <div
                class="orange"
                style="
                  box-sizing: border-box;
                  overflow-wrap: break-word;
                  color: orange;
                "
              >
                <%=data.customerDetails.email%>
              </div>
            </div>
          </div>
          <div
            class="row p-2"
            style="
              box-sizing: border-box;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              margin-right: -15px;
              margin-left: -15px;
              padding: 0.5rem !important;
            "
          >
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            >
              <div style="box-sizing: border-box">Poin yang Didapat:</div>
              <div
                class="orange"
                style="
                  box-sizing: border-box;
                  overflow-wrap: break-word;
                  color: orange;
                "
              >
                <%=data.customerDetails.pointsEarned%>
              </div>
            </div>
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            >
              <div style="box-sizing: border-box">Total Poin:</div>
              <div
                class="orange"
                style="
                  box-sizing: border-box;
                  overflow-wrap: break-word;
                  color: orange;
                "
              >
                <%=data.customerDetails.pointsTotal%>
              </div>
            </div>
            <div
              class="col-4"
              style="
                box-sizing: border-box;
                position: relative;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              "
            ></div>
          </div>
        </div>
      </div>
      <div
        class="footer"
        style="box-sizing: border-box; width: 100%; height: fit-content"
      >
        <img
          src="<%= footerImg %>"
          class="footerImg"
          style="
            box-sizing: border-box;
            vertical-align: middle;
            border-style: none;
            page-break-inside: avoid;
            width: 100%;
          "
        />
      </div>
    </div>
  </div>