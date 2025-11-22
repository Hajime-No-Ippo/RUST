mod calculator;

fn main() {
    let out = b"Hello from Rust!";
    let width: u32 = 24;
    let size = width.checked_sub(out.len().try_into().unwrap()).unwrap_or(0);

    let sample = width.checked_sub(25).unwrap_or(0);
    println!("Sample width after subtraction: {}", sample);

    //declaring array, using format! and to_string to convert Array and u32 to String
    let nums = [1,2,3,4,5];
    let str = format!("{:?}", nums);
    let str24 = width.to_string();
    
    //iterating through the array and printing each element
    println!("\n======iterating through the array and printing each element======" );
    for(i, &nums) in nums.iter().enumerate(){
        println!("\nnums:{}", nums);
        println!("Index: {}", i);
        println!("Width: {}", width);
        println!("{}", String::from_utf8_lossy(out));
        
    }

    //printing the variables,doing some formatting outputs
    println!("\n======printing the variables,doing some formatting outputs======" );
    println!("Array as string: {:?}", str);
    println!("Sub width with out: {}", size);
    println!("{}", 100);
    println!("Stringify width u32 to String: {}", str24);

    //calculator function usage
    println!("\n======Calculator function usage======" );
    let result = calculator::calculator(width as i32, nums[3], '/');
    println!("Calculate width with the fourth elements in nums arr's result: {}", result);

}