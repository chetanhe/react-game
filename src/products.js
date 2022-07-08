import React from "react";

function ProductRaw(props){
    
    return(
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.price}</td>
        </tr>
    );
}

function ProductCategoryRaw(props){
    return(
        <tr>
            <th colSpan="2">{props.category}</th>
        </tr>
    );
}

class ProductTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const products = this.props.products;
        const productRows = [];
        let lastCategory = '';
        products.forEach((product) => {
            if(lastCategory !== product.category){
                productRows.push(<ProductCategoryRaw category={product.category} key={product.category}/>);
            }
             productRows.push(<ProductRaw key={product.name} product={product} />);
             lastCategory = product.category;
        });
        
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        );
    }
}

class ProductFilter extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.state = {checked: false};
    }

    handleChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e){
       
        this.setState((state, props)=>({
            checked: !state.checked
          }));
          this.props.onInStockChange(e.target.checked);
    }

    render(){
        return(
            <div>
                <input type="text" value={this.props.filterText} onChange={this.handleChange} />
                <br/>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleInStockChange} /> only show products in stock
            </div>
        );
    }
}

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            filterText: ''
        };
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    componentDidMount(){
        const PRODUCTS = [
            {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
            {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
            {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
            {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
            {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
            {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
          ];
        this.setState({
            products: PRODUCTS
        });
    }

    handleFilterTextChange(text){
        const PRODUCTS = [
            {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
            {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
            {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'}
          ];
        this.setState({
            products:PRODUCTS,
            filterText: text
        });
    }

    handleInStockChange(inStockOnly){
        const PRODUCTS = [
            {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
            {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
            {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
          ];
        this.setState({
            products: PRODUCTS,
        });
    }


    render(){
        return(
            <div>
            <ProductFilter filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange} onInStockChange={this.handleInStockChange}/>
            <ProductTable products={this.state.products} />
            </div>
        );
    }
}

export default FilterableProductTable;