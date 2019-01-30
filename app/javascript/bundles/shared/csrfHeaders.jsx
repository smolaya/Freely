import ReactOnRails from "react-on-rails";

const csrfHeaders = {
                      'X-Requested-With': 'XMLTttpRequest',
                      'X-CSRF-TOKEN': ReactOnRails.authenticityToken()
                    }

export default csrfHeaders