                    <div className="flex items-center gap-3 ">
                      <label
                        htmlFor="select"
                        className="text-slate-800 font-medium tracking-wide text-xs my-2 "
                      >
                        Qty:
                      </label>
                      <div className="relative">
                        <select
                          id="select"
                          name="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {
                            //create ana arrya from obj.countInStock.
                            //[0,1,2]
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
