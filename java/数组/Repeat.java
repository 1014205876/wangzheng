import java.util.Arrays;

public class Repeat {
    public static void main(String[] args) {
        int arr[] = new int[] { 23, 42, 12, 6, 10 };
        System.out.println(arr);
        // Arrays.sort(arr);
        // System.out.println(arr);
        int newarr[] = Arrays.copyOfRange(arr, 0, 3);
        int newar = Arrays.binarySearch(arr, 42);
        System.out.println(newar);
        for (int i = 0; i < newarr.length; i++) {
            System.out.println(newarr[i]);
        }
    }
}